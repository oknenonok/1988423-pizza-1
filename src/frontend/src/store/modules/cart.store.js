import Vue from "vue";
import { uniqueId } from "lodash";
import {
  PUSH_TO_CART,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  SET_MISC_QUANTITY,
  SET_DELIVERY_TYPE,
} from "@/store/mutations-types";
import { DELIVERY_TYPE_SELFTAKE } from "@/common/constants";

const cartItemsNamespace = {
  module: "Cart",
  entity: "cartItems",
};

export default {
  namespaced: true,

  state: {
    cartItems: [],
    chosenMiscById: {},
    deliveryType: DELIVERY_TYPE_SELFTAKE,
    phone: "",
    street: "",
    building: "",
    flat: "",
  },

  getters: {
    /**
     * Необходимые для работы данные подгружены
     * @returns {boolean}
     */
    dataReady(state, getters, rootState) {
      return rootState.rawDough.length
        && rootState.rawIngredients.length
        && rootState.rawSauces.length
        && rootState.rawSizes.length
        && rootState.rawMisc.length;
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
     * Замыкание для количества ингредиента на пицце
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
     * @param {string|number} newDeliveryType
     */
    [SET_DELIVERY_TYPE](state, newDeliveryType) {
      state.deliveryType = newDeliveryType;
    },
  },

  actions: {
    /**
     * Добавить или обновить строку корзине
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
