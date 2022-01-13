import Vue from "vue";
import {
  DEFAULT_DOUGH,
  DEFAULT_SIZE,
  DEFAULT_SAUCE,
} from "@/common/constants";
import {
  SET_INGREDIENT_QUANTITY,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_PIZZA_NAME,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: {
    chosenDoughId: DEFAULT_DOUGH,
    chosenSizeId: DEFAULT_SIZE,
    chosenSauceId: DEFAULT_SAUCE,
    chosenIngredientsById: {},
    pizzaName: "",
  },

  getters: {
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
      return rootGetters.ingredients.filter((ingredient) => state.chosenIngredientsById[ingredient.id]);
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
      return getters.chosenIngredients.reduce(
        (total, ingredient) => total + ingredient.price * getters.getIngredientQuantity(ingredient.id),
        0
      );
    },

    /**
     * Итоговая цена пиццы
     * @returns {number}
     */
    price(state, getters) {
      return (
        (getters.chosenDough.price +
          getters.chosenSauce.price +
          getters.chosenIngredientsPrice
        ) * getters.chosenSize.multiplier
      );
    },
  },

  mutations: {
    /**
     * Обновить количество ингредиента на пицце
     * @param {object} state
     * @param {object} param1
     */
    [SET_INGREDIENT_QUANTITY](state, {ingredientId, quantity}) {
      if (quantity > 0) {
        Vue.set(state.chosenIngredientsById, ingredientId, +quantity);
      } else {
        Vue.delete(state.chosenIngredientsById, ingredientId);
      }
    },

    /**
     * Выбрать тесто
     * @param {object} state
     * @param {number} doughId
     */
    [SET_DOUGH](state, doughId) {
      state.chosenDoughId = +doughId;
    },

    /**
     * Выбрать размер
     * @param {object} state
     * @param {number} doughId
     */
    [SET_SIZE](state, sizeId) {
      state.chosenSizeId = +sizeId;
    },

    /**
     * Выбрать соус
     * @param {object} state
     * @param {number} doughId
     */
    [SET_SAUCE](state, sauceId) {
      state.chosenSauceId = +sauceId;
    },

    /**
     * Установить название пиццы
     * @param {object} state
     * @param {number} doughId
     */
    [SET_PIZZA_NAME](state, name) {
      state.pizzaName = name;
    },
  },
};
