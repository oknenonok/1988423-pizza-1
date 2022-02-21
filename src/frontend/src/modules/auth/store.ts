import {
  Getters,
  Mutations,
  Actions,
  Module,
  Context,
} from "vuex-smart-module";
import { SET_LOGGED_USER, RESET_STATE } from "@/store/mutations-types";
import { DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW } from "@/common/constants";
import setAuthHeader from "@/common/helpers/setAuthHeader";
import { IAuthCredentials, IUser } from "@/common/types";
import api from "@/services/api.service";
import { Store } from "vuex";
import AddressesModule from "@/modules/addresses/store";
import CartModule from "@/modules/cart/store";

class AuthState {
  user: IUser | null = null;
  token: string | null = null;
}

class AuthGetters extends Getters<AuthState> {}

class AuthMutations extends Mutations<AuthState> {
  [SET_LOGGED_USER](user: IUser | null) {
    this.state.user = user;
  }

  /**
   * Сбросить состояние
   * @param {object} state
   */
  [RESET_STATE]() {
    const emptyState = new AuthState();
    Object.assign(this.state, emptyState);
  }

  setToken(token: string) {
    this.state.token = token;
  }
}

class AuthActions extends Actions<
  AuthState,
  AuthGetters,
  AuthMutations,
  AuthActions
> {
  AddressesModule!: Context<typeof AddressesModule>;
  CartModule!: Context<typeof CartModule>;

  $init(store: Store<AuthState>): void {
    this.AddressesModule = AddressesModule.context(store);
    this.CartModule = CartModule.context(store);
  }

  /**
   * Залогиниться
   * @param {object} context
   * @param {object} payload
   */
  async login({ email, password }: IAuthCredentials) {
    try {
      const { token } = await api.auth.login({ email, password });
      if (token) {
        this.commit("setToken", token);
        setAuthHeader(token);
        await this.dispatch("loadData");
      }
      return token;
    } catch (e) {
      return null;
    }
  }

  /**
   * Загрузить информацию о залогиненном пользователе
   * @param {object} context
   */
  async loadData() {
    try {
      const user = await api.auth.loadData();
      this.actions.loginUser(user);
    } catch (e) {
      this.dispatch("logout", false);
    }
  }

  /**
   * Разлогиниться
   * @param {object} context
   */
  async logout(sendRequest = true) {
    this.commit(RESET_STATE);
    this.AddressesModule.commit(RESET_STATE);
    if (
      ![DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].includes(
        this.CartModule.state.deliveryType
      )
    ) {
      this.CartModule.actions.setDeliveryInfo(DELIVERY_TYPE_SELFTAKE);
    }
    if (sendRequest) {
      await api.auth.logout();
    }
    setAuthHeader(null);
  }

  loginUser(user: IUser | null) {
    this.commit(SET_LOGGED_USER, user);
    if (user) {
      this.CartModule.commit("setPhone", user.phone);
    }
  }
}

export default new Module({
  state: AuthState,
  getters: AuthGetters,
  mutations: AuthMutations,
  actions: AuthActions,
});
