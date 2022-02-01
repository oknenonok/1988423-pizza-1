import { cloneDeep } from "lodash";
import Vuex from "vuex";
import jest from "jest-mock";
import {
  state,
  mutations,
  getters,
  actions,
} from "@/store";
import modules from "@/store/modules";
import user from "@/tests/fixtures/user.json";
import misc from "@/tests/fixtures/misc.json";
import addresses from "@/tests/fixtures/addresses.json";
import orders from "@/tests/fixtures/orders.json";
import {
  dough,
  ingredients,
  sauces,
  sizes,
} from "@/tests/fixtures/pizza.json";
import {
  SET_ENTITY,
  SET_LOGGED_USER,
  SET_MISC_QUANTITY,
  SET_INGREDIENT_QUANTITY,
  SET_PIZZA_NAME,
} from "@/store/mutations-types";

import VuexPlugins from "@/plugins/vuexPlugins";

/**
 * Создать экземпляр vuex
 * @param {array} customActions
 * @returns {object}
 */
export const generateMockStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: cloneDeep(modules),
    plugins: [VuexPlugins]
  });
};

/**
 * Сделать моки для апи
 * @param {object} store
 */
export const createMockApi = (store) => {
  store.$api = {
    misc: {
      query: jest.fn(() => Promise.resolve(misc)),
    },
    dough: {
      query: jest.fn(() => Promise.resolve(dough)),
    },
    ingredients: {
      query: jest.fn(() => Promise.resolve(ingredients)),
    },
    sauces: {
      query: jest.fn(() => Promise.resolve(sauces)),
    },
    sizes: {
      query: jest.fn(() => Promise.resolve(sizes)),
    },
    auth: {
      login: jest.fn(() => ({ token: "token" })),
      logout: jest.fn(),
      loadData: jest.fn(() => Promise.resolve(user)),
    },
    orders: {
      query: jest.fn(() => Promise.resolve(orders)),
      post: jest.fn(),
      delete: jest.fn(),
    },
    addresses: {
      query: jest.fn(() => Promise.resolve(addresses)),
      put: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
    },
  };
};

/**
 * Авторизовать пользователя
 * @param {object} store
 */
export const authenticateUser = ({ commit }) => {
  commit(`Auth/${SET_LOGGED_USER}`, user);
  commit(SET_ENTITY, {
    module: "Auth",
    entity: "token",
    value: "token",
  });
};

/**
 * Заполнить данные для конструктора
 * @param {object} store
 */
export const fillData = ({ commit }) => {
  commit(SET_ENTITY, {
    entity: "rawDough",
    value: dough,
  });
  commit(SET_ENTITY, {
    entity: "rawIngredients",
    value: ingredients,
  });
  commit(SET_ENTITY, {
    entity: "rawSauces",
    value: sauces,
  });
  commit(SET_ENTITY, {
    entity: "rawSizes",
    value: sizes,
  });
  commit(SET_ENTITY, {
    entity: "rawMisc",
    value: misc,
  });
};

/**
 * Наполнить корзину
 * @param {object} store
 */
export const fillCart = (store) => {
  fillData(store);
  store.dispatch("Cart/addToCart", {
    name: "Pizza 1",
    sauce: sauces[0],
    dough: dough[0],
    size: sizes[0],
    ingredients: [
      {
        ...ingredients[0],
        quantity: 1,
      },
      {
        ...ingredients[1],
        quantity: 2,
      },
    ],
    quantity: 1,
    // price: (300 + 50 + 33*1 + 42*2) * 1 * 1 = 467
  }, { root: true });
  store.dispatch("Cart/addToCart", {
    name: "Pizza 2",
    sauce: sauces[1],
    dough: dough[1],
    size: sizes[1],
    ingredients: [
      {
        ...ingredients[2],
        quantity: 1,
      },
      {
        ...ingredients[3],
        quantity: 2,
      },
    ],
    quantity: 2,
    // price: (300 + 50 + 42*1 + 42*2) * 2 * 2 = 952 * 2 = 1904
  }, { root: true });
  store.commit(`Cart/${SET_MISC_QUANTITY}`, { id: 1, quantity: 1 });
  store.commit(`Cart/${SET_MISC_QUANTITY}`, { id: 2, quantity: 2 });
  // price = 1904 + 467 + 56 + 10*2 = 2447
};

/**
 * Наполнить сборщик
 * @param {object} store
 */
export const fillBuilder = (store) => {
  fillData(store);
  store.commit(`Builder/${SET_INGREDIENT_QUANTITY}`, { ingredientId: 1, quantity: 1 });
  store.commit(`Builder/${SET_INGREDIENT_QUANTITY}`, { ingredientId: 2, quantity: 2 });
  store.commit(`Builder/${SET_PIZZA_NAME}`, "new");
  // price: (300 + 50 + 33*1 + 42*2) * 2 = 934
};

/**
 * Заполнить адреса
 * @param {object} store
 */
export const fillAddresses = ({ commit }) => {
  commit(SET_ENTITY, {
    module: "Addresses",
    entity: "addresses",
    value: addresses,
  });
};

/**
 * Заполнить заказы
 * @param {object} store
 */
export const fillOrders = (store) => {
  fillData(store);
  store.commit(SET_ENTITY, {
    module: "Orders",
    entity: "rawOrders",
    value: orders,
  });
};
