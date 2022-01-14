import {
  SET_LOGGED_USER,
  SET_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,
  state: {
    user: null,
  },

  mutations: {
    [SET_LOGGED_USER](state, user) {
      state.user = user;
    },
  },

  actions: {
    /**
     * Залогиниться
     * @param {object} context
     * @param {object} payload
     */
    async loginUser({commit}, {email, password}) {
      let currentUser = require("@/static/user.json");
      if (currentUser.email === email && currentUser.password === password) {
        commit(SET_LOGGED_USER, currentUser);
        commit(SET_ENTITY, {
          module: "Cart",
          entity: "phone",
          value: currentUser.phone,
        }, {root: true});
      } else {
        throw new Error("Нет такого пользователя");
      }
    },

    /**
     * Разлогиниться
     * @param {object} context
     */
    async logoutUser({commit}) {
      commit(SET_LOGGED_USER, null);
    }
  }
};
