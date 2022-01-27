import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillCart, fillAddresses, authenticateUser } from "@/common/test-utils";
import CartAddress from "@/modules/cart/components/CartAddress";
import Vuex from "vuex";
import AppInput from "@/common/components/AppInput";
import VueTheMask from "vue-the-mask";
import { DELIVERY_TYPE_NEW } from "@/common/constants";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueTheMask);
localVue.component("AppInput", AppInput);

describe("CartAddress", () => {
  let wrapper;
  let store;
  const createComponent = options => {
    wrapper = mount(CartAddress, options);
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

  it("non-authenticated user", async () => {
    createComponent({ localVue, store });
    const options = wrapper.findAll("option");
    expect(options.length).toBe(2);
    expect(wrapper.find(".cart-form__address").exists()).toBeFalsy();

    await options.at(1).trigger("change");
    expect(store.state.Cart.deliveryType).toBe(DELIVERY_TYPE_NEW);
    expect(wrapper.find(".cart-form__address").exists()).toBeTruthy();
    await wrapper.find("input[name=phone]").setValue("79001112348");
    expect(store.state.Cart.phone).toBe("+7 900-111-23-48");
    await wrapper.find("input[name=street]").setValue("улица");
    expect(store.state.Cart.street).toBe("улица");
    await wrapper.find("input[name=building]").setValue("дом");
    expect(store.state.Cart.building).toBe("дом");
    await wrapper.find("input[name=flat]").setValue("кв");
    expect(store.state.Cart.flat).toBe("кв");
  });

  it("authenticated user", async () => {
    authenticateUser(store);
    fillAddresses(store);
    createComponent({ localVue, store });
    const options = wrapper.findAll("option");
    expect(options.length).toBe(4);
    expect(wrapper.find(".cart-form__address").exists()).toBeFalsy();

    await options.at(2).trigger("change");
    expect(store.state.Cart.deliveryType).toBe("1");
    expect(store.state.Cart.street).toBe("Ленина");
    expect(store.state.Cart.building).toBe("5");
    expect(store.state.Cart.flat).toBe("10");
    expect(wrapper.find("input[name=street]").element.disabled).toBeTruthy();
    expect(wrapper.find("input[name=building]").element.disabled).toBeTruthy();
    expect(wrapper.find("input[name=flat]").element.disabled).toBeTruthy();
  });
});
