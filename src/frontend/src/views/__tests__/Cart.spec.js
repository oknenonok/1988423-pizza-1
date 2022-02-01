import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  createMockApi,
  fillCart,
} from "@/tests/helpers";
import Cart from "@/views/Cart";
import Vuex from "vuex";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
const SAVED_PAYLOAD_TO_CHECK = {
  "address": null,
  "misc": [{ "miscId": 1, "quantity": 1 }, { "miscId": 2, "quantity": 2 }],
  "phone": "",
  "pizzas": [
    {
      "doughId": 1,
      "ingredients": [{ "ingredientId": 1, "quantity": 1 }, { "ingredientId": 2, "quantity": 2 }],
      "name": "Pizza 1",
      "quantity": 1,
      "sauceId": 1,
      "sizeId": 1
    },
    {
      "doughId": 2,
      "ingredients": [{ "ingredientId": 3, "quantity": 1 }, { "ingredientId": 4, "quantity": 2 }],
      "name": "Pizza 2",
      "quantity": 2,
      "sauceId": 2,
      "sizeId": 2 }
    ],
    "userId": null,
  };

describe("Cart", () => {
  let wrapper;
  let store;
  const stubs = ["CartPizzaList", "CartAdditionalList", "CartAddress", "CartFooter", "AppPopup", "CartOrderPopup"];
  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
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

  it("cart works", async () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.text()).toBe("");
    await flushPromises();
    expect(wrapper.text()).toBe("В корзине нет ни одного товара");
    await fillCart(store);
    await wrapper.find("form").trigger("submit");
    expect(store.$api.orders.post).toHaveBeenCalledWith(SAVED_PAYLOAD_TO_CHECK);
    expect(wrapper.find("apppopup-stub").exists()).toBeTruthy();
  });

  it("server error", async () => {
    store.$api.misc.query = jest.fn(() => Promise.reject());
    createComponent({ localVue, store, stubs });
    await flushPromises();
    expect(wrapper.text()).toBe("");
  });
});
