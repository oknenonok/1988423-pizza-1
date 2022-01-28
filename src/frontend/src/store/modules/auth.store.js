import {
  SET_LOGGED_USER,
  SET_ENTITY,
  RESET_STATE,
  SET_DELIVERY_TYPE,
} from "@/store/mutations-types";
import {
  DELIVERY_TYPE_SELFTAKE,
  DELIVERY_TYPE_NEW,
} from "@/common/constants";
import setAuthHeader from "@/common/helpers/setAuthHeader";

const setupState = () => ({
  user: null,
  token: null,
});

export default {
  namespaced: true,
  state: setupState(),

  mutations: {
    [SET_LOGGED_USER](state, user) {
      state.user = user;
      if (user) {
        this.commit(SET_ENTITY, {
          module: "Cart",
          entity: "phone",
          value: user.phone,
        }, { root: true });
      }
    },

    /**
     * Сбросить состояние
     * @param {object} state
     */
     [RESET_STATE](state) {
      Object.assign(state, setupState());
    },
  },

  actions: {
    /**
     * Залогиниться
     * @param {object} context
     * @param {object} payload
     */
    async login({ commit, dispatch }, { email, password }) {
      try {
        let { token } = await this.$api.auth.login({ email, password });
        if (token) {
          commit(SET_ENTITY, {
            module: "Auth",
            entity: "token",
            value: token,
          }, { root: true });
          setAuthHeader(this);
          await dispatch("loadData");
        }
        return token;
      } catch (e) {
        return null;
      }
    },

    /**
     * Загрузить информацию о залогиненном пользователе
     * @param {object} context
     */
    async loadData({ commit, dispatch }) {
      try {
        let user = await this.$api.auth.loadData();
        commit(SET_LOGGED_USER, user);
      } catch (e) {
        dispatch("logout", false);
      }
    },

    /**
     * Разлогиниться
     * @param {object} context
     */
    async logout({ commit, rootState }, sendRequest = true) {
      commit(RESET_STATE);
      commit(`Addresses/${RESET_STATE}`, null, { root: true });
      if (![DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].includes(rootState.Cart.deliveryType)) {
        commit(`Cart/${SET_DELIVERY_TYPE}`, DELIVERY_TYPE_SELFTAKE, { root: true });
      }
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      setAuthHeader(this);
    }
  }
};
