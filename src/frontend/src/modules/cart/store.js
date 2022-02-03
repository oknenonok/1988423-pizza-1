import Vue from "vue";
import {
  PUSH_TO_CART,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  SET_MISC_QUANTITY,
  SET_DELIVERY_TYPE,
  RESET_STATE,
  RESET_STATE_TO_ORDER,
} from "@/store/mutations-types";
import {
  DELIVERY_TYPE_SELFTAKE,
  DELIVERY_TYPE_NEW,
} from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";

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
  addressId: null,
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
    isCartEmpty(state, getters) {
      return state.cartItems.length === 0 && getters.chosenMisc.length === 0;
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
     * Обновить количество дополнительного товара
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
      if (![DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].includes(deliveryType)) {
        const address = this.state.Addresses.addresses.find((address) => address.id === +deliveryType);
        if (address) {
          state.addressId = address.id;
          state.street = address.street;
          state.building = address.building;
          state.flat = address.flat;
          state.comment = address.comment;
        }
      } else {
        state.addressId = null;
        state.street = "";
        state.building = "";
        state.flat = "";
        state.comment = "";
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

    /**
     * Установить состояние из заказа
     * @param {object} state
     * @param {object} cartItem
     */
    [RESET_STATE_TO_ORDER](state, order) {
      Object.assign(state, {
        cartItems: order.orderPizzas,
        chosenMiscById: order.orderMisc.reduce((result, misc) => ({
          ...result,
          [misc.miscId]: misc.quantity,
        }), {}),
        deliveryType: order.addressId ?? DELIVERY_TYPE_SELFTAKE,
        phone: order.phone,
        street: order?.orderAddress?.street ?? "",
        building: order?.orderAddress?.building ?? "",
        flat: order?.orderAddress?.flat ?? "",
        comment: order?.orderAddress?.comment ?? "",
        addressId: order.addressId,
        orderCreateStatus: orderCreateStatuses.EDITING,
      });
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы модуля данные
     * @param {object} context
     */
     async init({ rootState, dispatch }) {
      dispatch("loadMisc", null, {root: true});
      if (rootState.Auth.user) {
        dispatch("Addresses/load", null, {root: true});
      }
    },

    /**
     * Подгрузить данные для расчета стоимости
     * @param {object} context
     */
    async loadDataForCalculation({ state, dispatch }) {
      if (Object.keys(state.chosenMiscById).length > 0) {
        dispatch("loadMisc", null, {root: true});
      }
    },

    /**
     * Добавить или обновить строку корзины
     * @param {object} context
     * @param {object} payload
     */
    addToCart({ commit, state }, {id, name, sauce, dough, size, ingredients, quantity}) {
      let payload = {
        name,
        sauce,
        dough,
        size,
        ingredients,
        id: id ?? (Math.max(...state.cartItems.map(item => item.id), 0) + 1),
        quantity: quantity ?? 1,
        price: calculatePizzaPrice({
          sauce,
          dough,
          size,
          ingredientsPrice: calculateIngredientsPrice(ingredients)
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
