import { cloneDeep } from "lodash";
import { state, mutations, getters, actions } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";

import user from "@/static/user.json";
import {
  dough,
  ingredients,
  sauces,
  sizes,
} from "@/static/pizza.json";
import misc from "@/static/misc.json";
import {
  SET_ENTITY,
  SET_LOGGED_USER,
  SET_MISC_QUANTITY,
} from "@/store/mutations-types";

import VuexPlugins from "@/plugins/vuexPlugins";

export const generateMockStore = (customActions) => {
  const modulesCopy = cloneDeep(modules);
  if (customActions) {
    Object.entries(customActions).forEach(([module, value]) => {
      if (modules[module]) {
        modulesCopy[module] = { ...modulesCopy[module], value };
      } else {
        actions[module] = value;
      }
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: modulesCopy,
    plugins: [VuexPlugins]
  });
};

export const authenticateUser = ({ commit }) => {
  commit(`Auth/${SET_LOGGED_USER}`, user);
  commit(SET_ENTITY, {
    module: "Auth",
    entity: "token",
    value: "token",
  });
};

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
  }, { root: true });
  store.commit(`Cart/${SET_MISC_QUANTITY}`, { id: 1, quantity: 1 });
  store.commit(`Cart/${SET_MISC_QUANTITY}`, { id: 2, quantity: 2 });
};
