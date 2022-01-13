import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import {
  MAPPING_DOUGH,
  MAPPING_DOUGH_CAPTIONS,
  MAPPING_SIZE,
  MAPPING_SAUCE,
} from "@/common/constants";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["Cart", "Builder"],
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    rawDough: [],
    rawIngredients: [],
    rawSauces: [],
    rawSizes: [],
    rawMisc: [],
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
          caption: MAPPING_DOUGH_CAPTIONS[dough.id],
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

    /**
     * Дополнительные товары
     * @param {object} state
     * @returns {array}
     */
     misc(state) {
      return state.rawMisc;
    },
  },

  mutations: {
    /**
     * Универсальная мутация для обновления сущности
     * @param {object} state
     * @param {object} payload
     */
    [SET_ENTITY](state, { module, entity, value }) {
      let objToChange = module ? state[module] : state;
      objToChange[entity] = value;
    },

    /**
     * Универсальная мутация для обновления элемента массива
     * @param {object} state
     * @param {object} payload
     */
    [UPDATE_ENTITY](state, { module, entity, value }) {
      let objToChange = module ? state[module] : state;
      const index = objToChange[entity]
        .findIndex(({ id }) => id === value.id);
      if (~index) {
        objToChange[entity].splice(index, 1, value);
      }
    },

    /**
     * Универсальная мутация для удаления элемента массива
     * @param {object} state
     * @param {object} payload
     */
    [DELETE_ENTITY](state, { module, entity, id }) {
      let objToChange = module ? state[module] : state;
      objToChange[entity] = objToChange[entity].filter(e => +e.id !== +id);
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы приложения данные
     * @param {object} context
     */
    async init({ dispatch }) {
      await dispatch("loadDough");
      await dispatch("loadIngredients");
      await dispatch("loadSauces");
      await dispatch("loadSizes");
      await dispatch("loadMisc");
    },

    /**
     * Подгрузить виды теста
     * @param {object} context
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
     * @param {object} context
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
     * @param {object} context
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
     * @param {object} context
     */
    async loadSizes({ commit }) {
      //TODO: сделать получение из апи
      let { sizes } = await import("@/static/pizza.json");
      commit(SET_ENTITY, {
        entity: "rawSizes",
        value: sizes,
      });
    },

    /**
     * Подгрузить размеры
     * @param {object} context
     */
    async loadMisc({ commit }) {
      //TODO: сделать получение из апи
      let misc = require("@/static/misc.json");
      commit(SET_ENTITY, {
        entity: "rawMisc",
        value: misc,
      });
    },
  },

  modules,

  plugins: [vuexLocal.plugin],
});