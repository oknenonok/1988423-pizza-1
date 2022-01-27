import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, authenticateUser, fillCart } from "@/common/test-utils";
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader";
import Vuex from "vuex";
import VueRouter from "vue-router";
import priceFormat from "@/plugins/priceFormat";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);
localVue.use(VueRouter);

describe("AppLayoutHeader", () => {
  let wrapper;
  let store;
  const stubs = [
    "router-link",
    "AppLogo",
    "AppPopup",
    "Login",
  ];
  const routes = [
    {
      path: "/",
      component: AppLayoutHeader
    }
  ];
  const router = new VueRouter({ routes });

  const createComponent = options => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, stubs, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("non-authenticated user", async () => {
    createComponent({ localVue, store, stubs, router });
    expect(wrapper.find(".header__user").text()).toBe("Войти");
    await wrapper.find(".header__user a").trigger("click");
    expect(wrapper.vm.isLoginFormOpened).toBeTruthy();
  });

  it("authenticated user", async () => {
    authenticateUser(store);
    createComponent({ localVue, store, stubs, router });
    expect(wrapper.find(".header__user").text()).toBe("Вася Пупкин Выйти");
    await wrapper.find(".header__logout").trigger("click");
    expect(store.state.Auth.user).toEqual(null);
  });

  it("display cart", () => {
    fillCart(store);
    createComponent({ localVue, store, stubs, router });
    expect(wrapper.find(".header__cart").text()).toBe("2 447 ₽");
  });
});
