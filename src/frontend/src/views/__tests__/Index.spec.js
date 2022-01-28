import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, createMockApi, fillBuilder, fillCart } from "@/common/test-utils";
import Index from "@/views/Index";
import Vuex from "vuex";
import flushPromises from "flush-promises";
import { SET_SIZE, SET_INGREDIENT_QUANTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Index", () => {
  let wrapper;
  let store;
  const stubs = ["BuilderDoughSelector", "BuilderSizeSelector", "BuilderIngredientsSelector", "BuilderPizzaName", "BuilderPizzaView", "BuilderPriceCounter"];
  const createComponent = options => {
    wrapper = mount(Index, options);
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

  it("adding to cart works", async () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.text()).toBe("");
    await flushPromises();
    await fillBuilder(store);
    await wrapper.find("form").trigger("submit");
    expect(store.getters["Cart/price"]).toBe(934);
  });

  it("editing cart works", async () => {
    fillCart(store);
    const mocks = {
      $route: {
        query: { edit: store.state.Cart.cartItems[0].id },
      }
    };
    createComponent({ localVue, store, stubs, mocks });
    await flushPromises();
    expect(store.getters["Builder/price"]).toBe(467);
    await store.commit(`Builder/${SET_SIZE}`, 3);
    expect(store.getters["Cart/price"]).toBe(3381);
    await store.commit(`Builder/${SET_INGREDIENT_QUANTITY}`, { ingredientId: 1, quantity: 3});
    expect(store.getters["Cart/price"]).toBe(3579);
  });

  it("server error", async () => {
    store.$api.dough.query = jest.fn(() => Promise.reject());
    createComponent({ localVue, store, stubs });
    await flushPromises();
    expect(wrapper.text()).toBe("");
  });
});
