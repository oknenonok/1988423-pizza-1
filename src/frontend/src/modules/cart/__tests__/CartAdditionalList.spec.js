import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillCart } from "@/common/test-utils";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import Vuex from "vuex";
import AppItemCounter from "@/common/components/AppItemCounter";
import priceFormat from "@/plugins/priceFormat";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);
localVue.component("AppItemCounter", AppItemCounter);

describe("CartAdditionalList", () => {
  let wrapper;
  let store;
  const createComponent = options => {
    wrapper = mount(CartAdditionalList, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillCart(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("ingredients works", async () => {
    createComponent({ localVue, store });
    const counters = wrapper.findAll(".additional-list__counter");
    const input0 = counters.at(0).find("input[type=number]").element;
    const input1 = counters.at(1).find("input[type=number]").element;
    expect(counters.length).toBe(3);
    expect(input0.value).toBe("1");
    expect(input1.value).toBe("2");

    const buttons = counters.at(0).findAll("button");
    await buttons.at(0).trigger("click");
    expect(input0.value).toBe("0");
    await buttons.at(1).trigger("click");
    expect(input0.value).toBe("1");
  });
});
