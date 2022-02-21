import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillBuilder } from "@/tests/helpers";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import Vuex from "vuex";
import priceFormat from "@/plugins/priceFormat";
import { SET_PIZZA_NAME } from "@/store/mutations-types";
import AppButton from "@/common/components/AppButton";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);
localVue.component("AppButton", AppButton);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillBuilder(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("render correct", async () => {
    createComponent({ localVue, store });
    expect(wrapper.find("[data-test='finalPrice']").text()).toContain("934 ₽");
    expect(wrapper.find("button").element.disabled).toBeFalsy();
    await store.commit(`Builder/${SET_PIZZA_NAME}`, "");
    expect(wrapper.find("button").element.disabled).toBeTruthy();
  });
});
