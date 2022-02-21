import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillBuilder } from "@/tests/helpers";
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName";
import Vuex from "vuex";
import AppInput from "@/common/components/AppInput";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

describe("BuilderPizzaName", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaName, options);
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

  it("input works", async () => {
    createComponent({ localVue, store });
    const input = wrapper.findAll("input");
    input.setValue("new");
    expect(store.state.Builder.pizzaName).toBe("new");
  });
});
