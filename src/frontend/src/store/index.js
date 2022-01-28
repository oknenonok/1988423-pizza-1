import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
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
  modules: ["Cart", "Builder", "Auth"],
});

export const state = () => ({
  rawDough: [],
  rawIngredients: [],
  rawSauces: [],
  rawSizes: [],
  rawMisc: [],
});

export const getters = {
  /**
   * Виды теста
   * @param {object} state
   * @returns {array}
   */
  dough(state) {
    return state.rawDough.map((dough) => ({
      ...dough,
      value: MAPPING_DOUGH[dough.id],
      caption: MAPPING_DOUGH_CAPTIONS[dough.id],
    }));
  },

  /**
   * Ингредиенты
   * @param {object} state
   * @returns {array}
   */
  ingredients(state) {
    return state.rawIngredients.map((ingredient) => ({
      ...ingredient,
      value: ingredient.image.replace(/^.*\//, "").replace(".svg", ""),
    }));
  },

  /**
   * Соусы
   * @param {object} state
   * @returns {array}
   */
  sauces(state) {
    return state.rawSauces.map((sauce) => ({
      ...sauce,
      value: MAPPING_SAUCE[sauce.id],
    }));
  },

  /**
   * Размеры
   * @param {object} state
   * @returns {array}
   */
  sizes(state) {
    return state.rawSizes.map((size) => ({
      ...size,
      value: MAPPING_SIZE[size.id],
    })).sort((a, b) => a.multiplier < b.multiplier ? -1 : 0);
  },

  /**
   * Дополнительные товары
   * @param {object} state
   * @returns {array}
   */
  misc(state) {
    return state.rawMisc;
  },
};

export const mutations = {
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
  [UPDATE_ENTITY](state, { module, entity, value, oldId }) {
    oldId = oldId ?? value.id;
    let objToChange = module ? state[module] : state;
    const index = objToChange[entity]
      .findIndex(({ id }) => id === oldId);
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
    objToChange[entity] = objToChange[entity].filter(e => e.id !== id);
  },
};

export const actions = {
  /**
   * Подгрузить виды теста
   * @param {object} context
   */
  async loadDough({ commit, state }) {
    if (!state.rawDough.length) {
      try {
        let dough = await this.$api.dough.query();
        commit(SET_ENTITY, {
          entity: "rawDough",
          value: dough,
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  /**
   * Подгрузить ингредиенты
   * @param {object} context
   */
  async loadIngredients({ commit, state }) {
    if (!state.rawIngredients.length) {
      try {
        let ingredients = await this.$api.ingredients.query();
        commit(SET_ENTITY, {
          entity: "rawIngredients",
          value: ingredients,
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  /**
   * Подгрузить соусы
   * @param {object} context
   */
  async loadSauces({ commit, state }) {
    if (!state.rawSauces.length) {
      try {
        let sauces = await this.$api.sauces.query();
        commit(SET_ENTITY, {
          entity: "rawSauces",
          value: sauces,
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  /**
   * Подгрузить размеры
   * @param {object} context
   */
  async loadSizes({ commit, state }) {
    if (!state.rawSizes.length) {
      try {
        let sizes = await this.$api.sizes.query();
        commit(SET_ENTITY, {
          entity: "rawSizes",
          value: sizes,
        });
      } catch (e) {
        console.error(e);
      }
    }
  },

  /**
   * Подгрузить дополнительные товары
   * @param {object} context
   */
  async loadMisc({ commit, state }) {
    if (!state.rawMisc.length) {
      try {
        let misc = await this.$api.misc.query();
        commit(SET_ENTITY, {
          entity: "rawMisc",
          value: misc,
        });
      } catch (e) {
        console.error(e);
      }
    }
  },
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [VuexPlugins, vuexLocal.plugin],
});
