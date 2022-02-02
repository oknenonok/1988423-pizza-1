import Vue from "vue";
import {
  DEFAULT_DOUGH,
  DEFAULT_SIZE,
  DEFAULT_SAUCE,
} from "@/common/constants";
import {
  RESET_STATE,
  RESET_STATE_TO_CART_ITEM,
  SET_INGREDIENT_QUANTITY,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_PIZZA_NAME,
} from "@/store/mutations-types";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";

const setupState = () => ({
  chosenDoughId: DEFAULT_DOUGH,
  chosenSizeId: DEFAULT_SIZE,
  chosenSauceId: DEFAULT_SAUCE,
  chosenIngredientsById: {},
  pizzaName: "",
  editCartItemId: null,
});

export default {
  namespaced: true,

  state: setupState(),

  getters: {
    /**
     * Все необходимые данные подгружены
     * @returns {boolean}
     */
    dataReady(state, getters, rootState) {
      return rootState.rawDough.length
        && rootState.rawIngredients.length
        && rootState.rawSauces.length
        && rootState.rawSizes.length;
    },

    /**
     * Объект - выбранное тесто
     * @returns {object}
     */
    chosenDough(state, getters, rootState, rootGetters) {
      return rootGetters.dough.find((dough) => dough.id === state.chosenDoughId);
    },

    /**
     * Объект - выбранный соус
     * @returns {object}
     */
    chosenSauce(state, getters, rootState, rootGetters) {
      return rootGetters.sauces.find((sauce) => sauce.id === state.chosenSauceId);
    },

    /**
     * Объект - выбранный размер
     * @returns {object}
     */
    chosenSize(state, getters, rootState, rootGetters) {
      return rootGetters.sizes.find((size) => size.id === state.chosenSizeId);
    },

    /**
     * Массив - выбранные ингредиенты
     * @returns {array}
     */
    chosenIngredients(state, getters, rootState, rootGetters) {
      return rootGetters.ingredients
        .filter((ingredient) => state.chosenIngredientsById[ingredient.id])
        .map((ingredient) => {
          return {
            ...ingredient,
            quantity: getters.getIngredientQuantity(ingredient.id),
          }
        }
      );
    },

    /**
     * Замыкание для количества ингредиента на пицце
     * @param {object} state
     * @returns {function}
     */
    getIngredientQuantity(state) {
      return ingredientId => {
        return state.chosenIngredientsById[ingredientId] ?? 0;
      };
    },

    /**
     * Стоимость всех ингредиентов на пицце
     * @returns {number}
     */
    chosenIngredientsPrice(state, getters) {
      return calculateIngredientsPrice(getters.chosenIngredients);
    },

    /**
     * Итоговая цена пиццы
     * @returns {number}
     */
    price(state, getters) {
      return calculatePizzaPrice({
        dough: getters.chosenDough,
        sauce: getters.chosenSauce,
        size: getters.chosenSize,
        ingredientsPrice: getters.chosenIngredientsPrice,
      });
    },
  },

  mutations: {
    /**
     * Обновить количество ингредиента на пицце
     * @param {object} state
     * @param {object} payload
     */
    [SET_INGREDIENT_QUANTITY](state, {ingredientId, quantity}) {
      if (quantity > 0) {
        Vue.set(state.chosenIngredientsById, ingredientId, +quantity);
      } else {
        Vue.delete(state.chosenIngredientsById, ingredientId);
      }
      this.dispatch("Builder/updateCart");
    },

    /**
     * Выбрать тесто
     * @param {object} state
     * @param {number} doughId
     */
    [SET_DOUGH](state, doughId) {
      state.chosenDoughId = +doughId;
      this.dispatch("Builder/updateCart");
    },

    /**
     * Выбрать размер
     * @param {object} state
     * @param {number} doughId
     */
    [SET_SIZE](state, sizeId) {
      state.chosenSizeId = +sizeId;
      this.dispatch("Builder/updateCart");
    },

    /**
     * Выбрать соус
     * @param {object} state
     * @param {number} doughId
     */
    [SET_SAUCE](state, sauceId) {
      state.chosenSauceId = +sauceId;
      this.dispatch("Builder/updateCart");
    },

    /**
     * Установить название пиццы
     * @param {object} state
     * @param {number} doughId
     */
    [SET_PIZZA_NAME](state, name) {
      state.pizzaName = name;
      this.dispatch("Builder/updateCart");
    },

    /**
     * Сбросить состояние
     * @param {object} state
     */
    [RESET_STATE](state) {
      Object.assign(state, setupState());
    },

    /**
     * Установить состояние из строки корзины
     * @param {object} state
     * @param {object} cartItem
     */
    [RESET_STATE_TO_CART_ITEM](state, cartItem) {
      Object.assign(state, {
        chosenDoughId: cartItem.dough.id,
        chosenSizeId: cartItem.size.id,
        chosenSauceId: cartItem.sauce.id,
        chosenIngredientsById: cartItem.ingredients.reduce((result, item) => ({
          ...result,
          [item.id]: item.quantity,
        }), {}),
        pizzaName: cartItem.name,
        editCartItemId: cartItem.id,
      });
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы модуля данные
     * @param {object} context
     */
     async init({ dispatch }) {
      dispatch("loadDough", null, {root: true});
      dispatch("loadIngredients", null, {root: true});
      dispatch("loadSauces", null, {root: true});
      dispatch("loadSizes", null, {root: true});
    },

    /**
     * Обновить редактируемую строку корзины
     * @param {object} context
     */
    updateCart({dispatch, getters, state, rootState}) {
      if (state.editCartItemId !== null) {
        let cartItem = rootState.Cart.cartItems.find((item) => item.id === state.editCartItemId);
        dispatch("Cart/addToCart", {
          ...cartItem,
          name: state.pizzaName,
          sauce: getters.chosenSauce,
          dough: getters.chosenDough,
          size: getters.chosenSize,
          ingredients: getters.chosenIngredients,
        }, { root: true });
      }
    },
  }
};
