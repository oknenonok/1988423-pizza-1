import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  fillCart,
} from "@/tests/helpers";
import CartFooter from "@/modules/cart/components/CartFooter";
import Vuex from "vuex";
import priceFormat from "@/plugins/priceFormat";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);

describe("CartFooter", () => {
  let wrapper;
  let store;
  const stubs = ["router-link"];
  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    fillCart(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("renders correctly", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.find(".footer__price").text()).toContain("2 447 ₽");
    expect(wrapper.find("button[type=submit]").element.disabled).toBeFalsy();
  });
});
