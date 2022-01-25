import { cloneDeep } from "lodash";

import { mutations } from "@/store";
import modules from "@/store/modules";
import Vuex from "vuex";

import VuexPlugins from "@/plugins/vuexPlugins";

const state = () => ({
  rawDough: [],
  rawIngredients: [],
  rawSauces: [],
  rawSizes: [],
  rawMisc: [],
});

export const generateMockStore = actions => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules: modulesCopy,
    plugins: [VuexPlugins]
  });
};