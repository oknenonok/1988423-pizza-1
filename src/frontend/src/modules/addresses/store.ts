import {
  Getters,
  Mutations,
  Actions,
  Module,
  Context,
} from "vuex-smart-module";
import { uniqueId } from "lodash";
import { RESET_STATE, ADD_ADDRESS } from "@/store/mutations-types";
import { NEW_ID_PREFIX } from "@/common/constants";
import isNew from "@/common/helpers/isNew";
import { IAddress } from "@/common/types";
import api from "@/services/api.service";
import { updateEntity, deleteEntity } from "@/store/helpers";
import { Store } from "vuex";
import RootModule from "@/store/root-module";
import AuthModule from "@/modules/auth/store";

class AddressesState {
  addresses: IAddress[] = [];
}

const newAddress = {
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
};

class AddressesGetters extends Getters<AddressesState> {}

class AddressesMutations extends Mutations<AddressesState> {
  /**
   * Сбросить состояние
   * @param {object} state
   */
  [RESET_STATE]() {
    const emptyState = new AddressesState();
    Object.assign(this.state, emptyState);
  }

  /**
   * Добавить адрес
   * @param {object} state
   */
  [ADD_ADDRESS]() {
    this.state.addresses.push({ ...newAddress, id: uniqueId(NEW_ID_PREFIX) });
  }

  updateAddress(params: { value: IAddress; id?: IAddress["id"] | undefined }) {
    updateEntity(this.state, "addresses", params.value, params.id);
  }

  deleteAddress(id: IAddress["id"]) {
    deleteEntity(this.state, "addresses", id);
  }

  setAddresses(addresses: IAddress[]) {
    this.state.addresses = addresses;
  }
}

class AddressesActions extends Actions<
  AddressesState,
  AddressesGetters,
  AddressesMutations,
  AddressesActions
> {
  RootModule!: Context<typeof RootModule>;
  AuthModule!: Context<typeof AuthModule>;

  $init(store: Store<AddressesState>): void {
    this.RootModule = RootModule.context(store);
    this.AuthModule = AuthModule.context(store);
  }

  /**
   * Подгрузить все необходимые для работы модуля данные
   * @param {object} context
   */
  async init() {
    this.actions.load();
  }

  /**
   * Подгрузить адреса
   * @param {object} context
   */
  async load() {
    try {
      const addresses = await api.addresses.query();
      this.commit("setAddresses", addresses);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Сохранить адрес
   * @param {object} context
   * @param {object} payload
   */
  async save({ id, name, street, building, flat, comment }: IAddress) {
    const userId = this.AuthModule.state.user?.id;
    if (userId) {
      if (isNew(id)) {
        const address = await api.addresses.post({
          userId,
          name,
          street,
          building,
          flat,
          comment,
        });
        this.commit("updateAddress", {
          value: address,
          id,
        });
      } else {
        const address = {
          id,
          userId,
          name,
          street,
          building,
          flat,
          comment,
        };
        await api.addresses.put(address);
        this.commit("updateAddress", {
          value: address,
        });
      }
    }
  }

  /**
   * Удалить адрес
   * @param {object} context
   * @param {object} payload
   */
  async remove({ id }: IAddress) {
    if (!isNew(id)) {
      await api.addresses.delete(id);
    }
    this.commit("deleteAddress", id);
  }
}

export default new Module({
  state: AddressesState,
  getters: AddressesGetters,
  mutations: AddressesMutations,
  actions: AddressesActions,
});
