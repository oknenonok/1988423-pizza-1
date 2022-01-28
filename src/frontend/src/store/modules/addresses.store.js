import { uniqueId } from "lodash";
import {
  SET_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
  RESET_STATE,
  ADD_ADDRESS,
} from "@/store/mutations-types";
import { NEW_ID_PREFIX } from "@/common/constants";
import isNew from "@/common/helpers/isNew";

const setupState = () => ({
  addresses: [],
});

const addressesNamespace = {
  module: "Addresses",
  entity: "addresses",
};

const newAddress = {
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

export default {
  namespaced: true,
  state: setupState(),

  mutations: {
    /**
     * Сбросить состояние
     * @param {object} state
     */
    [RESET_STATE](state) {
      Object.assign(state, setupState());
    },

    /**
     * Добавить адрес
     * @param {object} state
     */
    [ADD_ADDRESS](state) {
      state.addresses.push({ ...newAddress, id: uniqueId(NEW_ID_PREFIX)});
    },
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы модуля данные
     * @param {object} context
     */
    async init({ dispatch }) {
      dispatch("load");
    },

    /**
     * Подгрузить адреса
     * @param {object} context
     */
    async load({ commit }) {
      try {
        let addresses = await this.$api.addresses.query();
        commit(SET_ENTITY, {
          ...addressesNamespace,
          value: addresses,
        }, { root: true });
      } catch (e) {
        console.error(e);
      }
    },

    /**
     * Сохранить адрес
     * @param {object} context
     * @param {object} payload
     */
    async save({ commit, rootState }, { id, name, street, building, flat, comment }) {
      let userId = rootState.Auth.user.id;
      if (isNew(id)) {
        let address = await this.$api.addresses.post({ userId, name, street, building, flat, comment });
        commit(UPDATE_ENTITY, {
          ...addressesNamespace,
          value: address,
          oldId: id,
        }, { root: true });
      } else {
        await this.$api.addresses.put({ id, userId, name, street, building, flat, comment });
        commit(UPDATE_ENTITY, {
          ...addressesNamespace,
          value: {
            id,
            name,
            street,
            building,
            flat,
            comment,
          },
        }, { root: true });
      }
    },

    /**
     * Удалить адрес
     * @param {object} context
     * @param {object} payload
     */
    async remove({ commit }, { id }) {
      if (!isNew(id)) {
        await this.$api.addresses.delete(id);
      }
      commit(DELETE_ENTITY, {
        ...addressesNamespace,
        id,
      }, { root: true });
    },
  }
};
