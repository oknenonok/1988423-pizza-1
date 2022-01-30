import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  fillOrders,
  authenticateUser,
} from "@/common/test-utils";
import OrderInfo from "@/modules/orders/components/OrderInfo";
import Vuex from "vuex";
import priceFormat from "@/plugins/priceFormat";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);

describe("OrderInfo", () => {
  let wrapper;
  let store;
  const stubs = ["AppPizzaDescription"];
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(OrderInfo, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    authenticateUser(store);
    fillOrders(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    const propsData = { order: store.getters["Orders/orders"][0] };
    createComponent({ localVue, store, stubs, propsData, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("first order renders correctly", async () => {
    const propsData = { order: store.getters["Orders/orders"][1] };
    createComponent({ localVue, store, stubs, propsData, mocks });
    expect(wrapper.find(".order__number").text()).toBe("Заказ #1");
    expect(wrapper.find(".order__sum").text()).toBe("Сумма заказа: 2 300 ₽");

    const items = wrapper.findAll(".order__item");
    expect(items.length).toBe(1);
    expect(items.at(0).find(".order__price").text().replace(/\s+/g, " ")).toBe("2 x 952 ₽");

    const misc = wrapper.findAll("[data-test='additionalPrice']");
    expect(wrapper.find(".order__additional").exists()).toBeTruthy();
    expect(misc.length).toBe(2);
    expect(misc.at(0).text().replace(/\s+/g, " ")).toBe("2 x 170 ₽");
    expect(misc.at(1).text()).toBe("56 ₽");

    expect(wrapper.find(".order__address").text()).toBe("Самовывоз");
  });

  it("second order renders correctly", async () => {
    const propsData = { order: store.getters["Orders/orders"][0] };
    createComponent({ localVue, store, stubs, propsData, mocks });
    expect(wrapper.find(".order__number").text()).toBe("Заказ #2");
    expect(wrapper.find(".order__sum").text()).toBe("Сумма заказа: 1 360 ₽");

    const items = wrapper.findAll(".order__item");
    expect(items.length).toBe(2);
    expect(items.at(0).find(".order__price").text().replace(/\s+/g, " ")).toBe("434 ₽");
    expect(items.at(1).find(".order__price").text().replace(/\s+/g, " ")).toBe("926 ₽");

    expect(wrapper.find(".order__additional").exists()).toBeFalsy();

    expect(wrapper.find(".order__address").text()).toBe("Адрес доставки: Ленина, д. 5, кв. 10");
  });

  it("action delete", async () => {
    const propsData = { order: store.getters["Orders/orders"][0] };
    createComponent({ localVue, store, stubs, propsData, mocks });
    const spy = jest.spyOn(wrapper.vm, "remove");
    await wrapper.find("[data-test='remove']").trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("action repeat", async () => {
    const propsData = { order: store.getters["Orders/orders"][1] };
    createComponent({ localVue, store, stubs, propsData, mocks });
    await wrapper.find("[data-test='repeat']").trigger("click");
    expect(store.getters["Cart/price"]).toBe(2300);
  });
});
