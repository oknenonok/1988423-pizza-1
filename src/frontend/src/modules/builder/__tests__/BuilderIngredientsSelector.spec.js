import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  fillBuilder,
} from "@/common/test-utils";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import Vuex from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppItemCounter from "@/common/components/AppItemCounter";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppRadioButton", AppRadioButton);
localVue.component("AppItemCounter", AppItemCounter);

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let store;
  const stubs = ["AppDrag"];
  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillBuilder(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("selector works", async () => {
    createComponent({ localVue, store, stubs });
    const elements = wrapper.findAll(".ingredients__input");
    expect(elements.length).toBe(2);
    expect(elements.at(0).find("input").element.checked).toBeTruthy();

    await elements.at(1).find("input").trigger("click");
    expect(elements.at(1).find("input").element.checked).toBeTruthy();
    expect(store.state.Builder.chosenSauceId).toBe(2);
  });

  it("ingredients works", async () => {
    createComponent({ localVue, store, stubs });
    const counters = wrapper.findAll(".ingredients__counter");
    const input0 = counters.at(0).find("input[type=number]").element;
    const input1 = counters.at(1).find("input[type=number]").element;
    expect(counters.length).toBe(15);
    expect(input0.value).toBe("1");
    expect(input1.value).toBe("2");

    const buttons = counters.at(0).findAll("button");
    await buttons.at(0).trigger("click");
    expect(input0.value).toBe("0");
    await buttons.at(1).trigger("click");
    expect(input0.value).toBe("1");
  });
});
