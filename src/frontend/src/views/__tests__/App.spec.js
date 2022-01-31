import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  createMockApi,
  fillCart,
} from "@/tests/helpers";
import App from "@/App";
import Vuex from "vuex";
import flushPromises from "flush-promises";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App", () => {
  let wrapper;
  let store;
  const stubs = ["AppNotifications"];
  const createComponent = (options) => {
    wrapper = shallowMount(App, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createMockApi(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("what if order created", async () => {
    await fillCart(store);
    await store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "orderCreateStatus",
      value: orderCreateStatuses.SUCCESS,
    }, { root: true });
    createComponent({ localVue, store, stubs });
    await flushPromises();
    expect(store.getters["Cart/price"]).toBe(0);
    expect(store.state.Cart.orderCreateStatus).toBe(orderCreateStatuses.EDITING);
  });

  it("what if order failed", async () => {
    await fillCart(store);
    await store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "orderCreateStatus",
      value: orderCreateStatuses.SENDING,
    }, { root: true });
    createComponent({ localVue, store, stubs });
    await flushPromises();
    expect(store.getters["Cart/price"]).toBe(2447);
    expect(store.state.Cart.orderCreateStatus).toBe(orderCreateStatuses.EDITING);
  });
});
