import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  fillBuilder,
} from "@/common/test-utils";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("BuilderPizzaView", () => {
  let wrapper;
  let store;
  const stubs = ["AppDrop"];
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
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

  it("render correct", async () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.classes()).toContain("pizza--foundation--light-tomato");

    const subclasses = wrapper
      .findAll(".pizza__filling")
      .wrappers.map((element) => element.classes().join(" "));
    expect(subclasses.length).toBe(3);
    expect(subclasses).toContain("pizza__filling pizza__filling--mushrooms");
    expect(subclasses).toContain("pizza__filling pizza__filling--cheddar");
    expect(subclasses).toContain("pizza__filling pizza__filling--cheddar pizza__filling--second");
  });
});
