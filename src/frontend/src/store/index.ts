import { createStore } from "vuex-smart-module";
import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import RootModule from "@/store/root-module";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["Cart", "Builder", "Auth"],
});

export default createStore(
  RootModule,

  {
    strict: process.env.NODE_ENV !== "production",
    plugins: [vuexLocal.plugin],
  }
);
