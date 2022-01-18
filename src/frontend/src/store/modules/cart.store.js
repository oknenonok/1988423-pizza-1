import Vue from "vue";
import { uniqueId } from "lodash";
import {
  PUSH_TO_CART,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  SET_MISC_QUANTITY,
  SET_DELIVERY_TYPE,
  RESET_STATE,
} from "@/store/mutations-types";
import {
  DELIVERY_TYPE_SELFTAKE,
  DELIVERY_TYPE_NEW,
} from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";

const cartItemsNamespace = {
  module: "Cart",
  entity: "cartItems",
};

const setupState = () => ({
  cartItems: [],
  chosenMiscById: {},
  deliveryType: DELIVERY_TYPE_SELFTAKE,
  phone: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  orderCreateStatus: orderCreateStatuses.EDITING,
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    /**
     * Необходимые для работы данные подгружены
     * @returns {boolean}
     */
    dataReady(state, getters, rootState) {
      return rootState.rawMisc.length;
    },

    /**
     * Пуста ли корзина
     * @returns {number}
     */
    isCartEmpty(state) {
      return state.cartItems.length === 0;
    },

    /**
     * Стоимость всех товаров в корзине
     * @returns {number}
     */
    price(state, getters) {
      return getters.pizzasPrice + getters.miscPrice;
    },

    /**
     * Стоимость всех пицц в корзине
     * @returns {number}
     */
    pizzasPrice(state) {
      return state.cartItems.reduce((total, item) => (total + item.quantity * item.price), 0);
    },

    /**
     * Стоимость дополнительных товаров в корзине
     * @returns {number}
     */
    miscPrice(state, getters) {
      return getters.chosenMisc.reduce((total, item) => (total + item.quantity * item.price), 0);
    },

    /**
     * Выбранные дополнительные товары
     * @returns {array}
     */
    chosenMisc(state, getters, rootState, rootGetters) {
      return rootGetters.misc
        .filter((misc) => state.chosenMiscById[misc.id])
        .map((misc) => ({
          ...misc,
          quantity: getters.getMiscQuantity(misc.id),
        })
      );
    },

    /**
     * Замыкание для количества дополнительного товара в корзине
     * @returns {function}
     */
    getMiscQuantity(state) {
      return (miscId) => {
        return state.chosenMiscById[miscId] ?? 0;
      };
    },
  },

  mutations: {
    /**
     * Добавить пиццу в корзину
     * @param {object} state
     * @param {object} item
     */
    [PUSH_TO_CART](state, item) {
      state.cartItems.push(item);
    },

    /**
     * Обновить количество ингредиента на пицце
     * @param {object} state
     * @param {object} payload
     */
    [SET_MISC_QUANTITY](state, {id, quantity}) {
      if (quantity > 0) {
        Vue.set(state.chosenMiscById, id, +quantity);
      } else {
        Vue.delete(state.chosenMiscById, id);
      }
    },

    /**
     * Выбрать способ получения
     * @param {object} state
     * @param {string|number} deliveryType
     */
    [SET_DELIVERY_TYPE](state, deliveryType) {
      state.deliveryType = deliveryType;
      if ([DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].indexOf(deliveryType) === -1) {
        const address = this.state.Addresses.addresses.find((address) => address.id === +deliveryType);
        if (address) {
          state.street = address.street;
          state.building = address.building;
          state.flat = address.flat;
          state.comment = address.comment;
        }
      }
    },

    /**
     * Сбросить состояние
     * @param {object} state
     */
    [RESET_STATE](state) {
      Object.assign(state, setupState());
      if (this.state.Auth.user) {
        state.phone = this.state.Auth.user.phone;
      }
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы модуля данные
     * @param {object} context
     */
     async init({ dispatch }) {
      dispatch("loadMisc", null, {root: true});
      dispatch("Addresses/load", null, {root: true});
    },

    /**
     * Добавить или обновить строку корзины
     * @param {object} context
     * @param {object} payload
     */
    addToCart({commit, rootGetters}, {id, name, sauce, dough, size, ingredients, quantity}) {
      let payload = {
        name,
        sauce,
        dough,
        size,
        ingredients,
        id: id ?? uniqueId(),
        quantity: quantity ?? 1,
        price: rootGetters["Builder/calculatePrice"]({
          sauce,
          dough,
          size,
          ingredientsPrice: rootGetters["Builder/calculateIngredientsPrice"](ingredients)
        }),
      }
      if (id) {
        commit(UPDATE_ENTITY, {
          ...cartItemsNamespace,
          value: payload,
        }, { root: true });
      } else {
        commit(PUSH_TO_CART, payload);
      }
    },

    /**
     * Обновить количество строки корзины
     * @param {object} context
     * @param {object} payload
     */
    updateQuantity({commit}, {item, quantity}) {
      if (quantity) {
        commit(UPDATE_ENTITY, {
          ...cartItemsNamespace,
          value: {
            ...item,
            quantity
          },
        }, { root: true });
      } else {
        commit(DELETE_ENTITY, {
          ...cartItemsNamespace,
          id: item.id,
        }, { root: true });
      }
    },
  }
};
