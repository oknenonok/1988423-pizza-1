import { uniqueId } from "lodash";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

export default {
  namespaced: true,
  state: {
    notifications: [],
  },

  mutations: {
    /**
     * Добавление уведомления
     * @param {object} state
     * @param {object} notification
     */
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [notification, ...state.notifications];
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
     * Создать уведомление
     * @param {object} context
     * @param {object} payload
     */
    async createNotification({ commit }, { ...notification }) {
      const uniqueNotification = {
        ...notification,
        id: +uniqueId(),
      };
      commit(ADD_NOTIFICATION, uniqueNotification);
      setTimeout(
        () => commit(DELETE_NOTIFICATION, uniqueNotification.id),
        MESSAGE_LIVE_TIME
      );
    },
  },
};
