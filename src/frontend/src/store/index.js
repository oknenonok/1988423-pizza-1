import Vue from "vue";
import Vuex from "vuex";
import { uniqueId } from "lodash";
import VuexPersistence from "vuex-persist";
import modules from "@/store/modules";
import VuexPlugins from "@/plugins/vuexPlugins";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutations-types";
import {
  MAPPING_DOUGH,
  MAPPING_DOUGH_CAPTIONS,
  MAPPING_SIZE,
  MAPPING_SAUCE,
  MESSAGE_LIVE_TIME,
} from "@/common/constants";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["Cart", "Builder", "Auth"],
})

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  state: {
    rawDough: [],
    rawIngredients: [],
    rawSauces: [],
    rawSizes: [],
    rawMisc: [],
    notifications: [],
  },

  getters: {
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

    /**
     * Добавление уведомления
     * @param {object} state
     * @param {object} notification
     */
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },

    /**
     * Удаление уведомления
     * @param {object} state
     * @param {string} id
     */
    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        notification => notification.id !== id
      );
    },
  },

  actions: {
    /**
     * Подгрузить виды теста
     * @param {object} context
     */
    async loadDough({ commit }) {
      let dough = await this.$api.dough.query();
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
      let ingredients = await this.$api.ingredients.query();
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
      let sauces = await this.$api.sauces.query();
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
      let sizes = await this.$api.sizes.query();
      commit(SET_ENTITY, {
        entity: "rawSizes",
        value: sizes,
      });
    },

    /**
     * Подгрузить дополнительные товары
     * @param {object} context
     */
    async loadMisc({ commit }) {
      let misc = await this.$api.misc.query();
      commit(SET_ENTITY, {
        entity: "rawMisc",
        value: misc,
      });
    },

    /**
     * Создать уведомление
     * @param {object} context
     * @param {object} payload
     */
    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: uniqueId(),
      };
      commit(ADD_NOTIFICATION, uniqueNotification);
      setTimeout(
        () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
        MESSAGE_LIVE_TIME
      );
    },
  },

  modules,

  plugins: [VuexPlugins, vuexLocal.plugin],
});
