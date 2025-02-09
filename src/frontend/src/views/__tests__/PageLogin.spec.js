import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  createMockApi,
} from "@/tests/helpers";
import PageLogin from "@/views/PageLogin";
import Vuex from "vuex";
import AppInput from "@/common/components/AppInput";
import AppButton from "@/common/components/AppButton";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppInput", AppInput);
localVue.component("AppButton", AppButton);

describe("PageLogin", () => {
  let wrapper;
  let store;
  const directives = {
    clickOutside: jest.fn(),
    autofocus: jest.fn(),
  };
  const propsData = {
    isPopup: true,
  };
  const mocks = {
    $route: {
      query: { back: "/url" },
    },
    $router: {
      push: jest.fn()
    },
  };
  const createComponent = (options) => {
    wrapper = mount(PageLogin, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createMockApi(store);
    propsData.isPopup = true;
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, directives, propsData, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("can login", async () => {
    createComponent({ localVue, store, directives, propsData, mocks });
    await wrapper.find("input[type=email]").setValue("user@example.com");
    await wrapper.find("input[type=password]").setValue("password");
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    expect(store.state.Auth.token).toBe("token");
    expect(store.$api.auth.login).toHaveBeenCalledWith({ "email": "user@example.com", "password": "password" });
    expect(store.$api.auth.loadData).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted("close").length).toBe(1);
  });

  it("not in popup login", async () => {
    propsData.isPopup = false;
    createComponent({ localVue, store, directives, propsData, mocks });
    await wrapper.find("input[type=email]").setValue("user@example.com");
    await wrapper.find("input[type=password]").setValue("password");
    await wrapper.find("form").trigger("submit");
    await flushPromises();
    expect(store.state.Auth.token).toBe("token");
    expect(store.$api.auth.login).toHaveBeenCalledWith({ "email": "user@example.com", "password": "password" });
    expect(store.$api.auth.loadData).toHaveBeenCalledTimes(1);
    expect(mocks.$router.push).toHaveBeenCalledWith("/url");
  });

  it("error login", async () => {
    store.$api.auth.login = jest.fn(() => Promise.reject({ statusCode: 400, name: "BadRequestError", message: "Логин и/или пароль неверны" }));
    createComponent({ localVue, store, directives, propsData, mocks });
    await wrapper.find("input[type=email]").setValue("user@example.com");
    await wrapper.find("input[type=password]").setValue("password");
    await wrapper.find("form").trigger("submit");
    expect(store.state.Auth.token).toBe(null);
    expect(store.$api.auth.loadData).toHaveBeenCalledTimes(0);
    expect(wrapper.emitted("close")).toBeFalsy();
  });
});
