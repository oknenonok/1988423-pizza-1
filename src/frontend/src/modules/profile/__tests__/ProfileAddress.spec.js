import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  createMockApi,
  fillAddresses,
  authenticateUser,
} from "@/common/test-utils";
import ProfileAddress from "@/modules/profile/components/ProfileAddress";
import Vuex from "vuex";
import AppInput from "@/common/components/AppInput";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);

const SAVED_PAYLOAD_TO_CHECK = {
  "building": "12",
  "comment": "коммент",
  "flat": "",
  "id": 1,
  "name": "Первый",
  "street": "Ленина",
  "userId": "uuid",
};

describe("ProfileAddress", () => {
  let wrapper;
  let store;
  let propsData;
  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createMockApi(store);
    authenticateUser(store);
    fillAddresses(store);
    propsData = {
      index: 1,
      address: store.state.Addresses.addresses[0],
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("edit address", async () => {
    createComponent({ localVue, store, propsData });
    expect(wrapper.find(".address-form--opened").exists()).toBeFalsy();
    expect(wrapper.find(".address-form__header b").text()).toBe("Адрес №1. Первый");
    expect(wrapper.find(".address-form p").text()).toBe("Ленина, д. 5, кв. 10");
    await wrapper.find(".address-form__edit button").trigger("click");
    expect(wrapper.find(".address-form--opened").exists()).toBeTruthy();
    expect(wrapper.find(".address-form--opened input[name=name]").element.value).toBe("Первый");
    expect(wrapper.find(".address-form--opened input[name=street]").element.value).toBe("Ленина");
    expect(wrapper.find(".address-form--opened input[name=building]").element.value).toBe("5");
    expect(wrapper.find(".address-form--opened input[name=flat]").element.value).toBe("10");
    expect(wrapper.find(".address-form--opened input[name=comment]").element.value).toBe("коммент");
    await wrapper.find(".address-form--opened input[name=building]").setValue("12");
    await wrapper.find(".address-form--opened input[name=flat]").setValue("");
    await wrapper.find(".address-form").trigger("submit");
    await flushPromises();
    expect(wrapper.find(".address-form--opened").exists()).toBeFalsy();
    expect(wrapper.find(".address-form p").text()).toBe("Ленина, д. 12");
    expect(store.$api.addresses.put).toHaveBeenCalledWith(SAVED_PAYLOAD_TO_CHECK);
  });

  it("delete address", async () => {
    createComponent({ localVue, store, propsData });
    await wrapper.find(".address-form__edit button").trigger("click");
    await wrapper.find(".address-form__buttons button[type=button]").trigger("click");
    await flushPromises();
    expect(store.state.Addresses.addresses.length).toBe(1);
    expect(store.$api.addresses.delete).toHaveBeenCalledWith(1);
  });
});
