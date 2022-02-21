import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillBuilder } from "@/tests/helpers";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import Vuex from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppRadioButton", AppRadioButton);

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
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

  it("selector works", async () => {
    createComponent({ localVue, store });
    const elements = wrapper.findAll(".diameter__input");
    expect(elements.length).toBe(3);
    expect(elements.at(1).find("input").element.checked).toBeTruthy();

    await elements.at(0).find("input").trigger("click");
    expect(elements.at(0).find("input").element.checked).toBeTruthy();
    expect(store.state.Builder.chosenSizeId).toBe(1);
  });
});
