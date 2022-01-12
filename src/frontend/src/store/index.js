import Vue from "vue";
import Vuex from "vuex";
import modules from "@/store/modules";
import {
  SET_ENTITY,
} from "@/store/mutations-types";
import {
  MAPPING_DOUGH,
  MAPPING_SIZE,
  MAPPING_SAUCE,
} from "@/common/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    rawDough: [],
    rawIngredients: [],
    rawSauces: [],
    rawSizes: [],
    allLoaded: false,
  },

  getters: {
    /**
     * Виды теста
     * @param {object} state
     * @returns {array}
     */
    dough(state) {
      return state.rawDough.map((dough) => {
        return {
          ...dough,
          value: MAPPING_DOUGH[dough.id],
        }
      });
    },

    /**
     * Ингредиенты
     * @param {object} state
     * @returns {array}
     */
    ingredients(state) {
      return state.rawIngredients.map((ingredient) => {
        return {
          ...ingredient,
          value: ingredient.image.replace(/^.*\//, "").replace(".svg", ""),
        }
      });
    },

    /**
     * Соусы
     * @param {object} state
     * @returns {array}
     */
    sauces(state) {
      return state.rawSauces.map((sauce) => {
        return {
          ...sauce,
          value: MAPPING_SAUCE[sauce.id],
        }
      });
    },

    /**
     * Размеры
     * @param {object} state
     * @returns {array}
     */
    sizes(state) {
      return state.rawSizes.map((size) => {
        return {
          ...size,
          value: MAPPING_SIZE[size.id],
        }
      });
    },
  },

  mutations: {
    /**
     * Универсальная мутация для обновления сущности
     * @param {object} state
     * @param {object} param1
     */
    [SET_ENTITY](state, { module, entity, value }) {
      let objToChange = module ? state[module] : state;
      objToChange[entity] = value;
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы приложения данные
     * @param {object} param0
     */
    async init({ commit, dispatch }) {
      await dispatch("loadDough");
      await dispatch("loadIngredients");
      await dispatch("loadSauces");
      await dispatch("loadSizes");
      commit(SET_ENTITY, {
        entity: "allLoaded",
        value: true,
      });
    },

    /**
     * Подгрузить виды теста
     * @param {object} param0
     */
    async loadDough({ commit }) {
      //TODO: сделать получение из апи
      let { dough } = await import("@/static/pizza.json");
      commit(SET_ENTITY, {
        entity: "rawDough",
        value: dough,
      });
    },

    /**
     * Подгрузить ингредиенты
     * @param {object} param0
     */
    async loadIngredients({ commit }) {
      //TODO: сделать получение из апи
      let { ingredients } = await import("@/static/pizza.json");
      commit(SET_ENTITY, {
        entity: "rawIngredients",
        value: ingredients,
      });
    },

    /**
     * Подгрузить соусы
     * @param {object} param0
     */
    async loadSauces({ commit }) {
      //TODO: сделать получение из апи
      let { sauces } = await import("@/static/pizza.json");
      commit(SET_ENTITY, {
        entity: "rawSauces",
        value: sauces,
      });
    },

    /**
     * Подгрузить размеры
     * @param {object} param0
     */
    async loadSizes({ commit }) {
      //TODO: сделать получение из апи
      let { sizes } = await import("@/static/pizza.json");
      commit(SET_ENTITY, {
        entity: "rawSizes",
        value: sizes,
      });
    },
  },

  modules,
});