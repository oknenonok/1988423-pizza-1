import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  fillCart,
} from "@/common/test-utils";
import CartOrderPopup from "@/modules/cart/components/CartOrderPopup";
import Vuex from "vuex";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import { SET_ENTITY } from "@/store/mutations-types";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("CartOrderPopup", () => {
  let wrapper;
  let store;
  const directives = {
    clickOutside: jest.fn(),
  };
  const listeners = { close: null };
  const createComponent = (options) => {
    wrapper = mount(CartOrderPopup, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillCart(store);
    listeners.close = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, directives, listeners });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders correctly", async () => {
    createComponent({ localVue, store, directives, listeners });
    expect(wrapper.find("p").text()).toContain("Что-то пошло не так");
    expect(wrapper.find(".button").text()).toContain("Ладно");

    await store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "orderCreateStatus",
      value: orderCreateStatuses.SENDING,
    }, { root: true });
    expect(wrapper.find("p").text()).toContain("Создаём ваш заказ");
    expect(wrapper.find(".button").exists()).toBeFalsy();

    await store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "orderCreateStatus",
      value: orderCreateStatuses.SUCCESS,
    }, { root: true });
    expect(wrapper.find("p").text()).toContain("начали готовить");
    expect(wrapper.find(".button").text()).toContain("Отлично");

    await wrapper.find(".button").trigger("click");
    await wrapper.find(".close").trigger("click");
    expect(listeners.close).toHaveBeenCalledTimes(2);
  });
});
