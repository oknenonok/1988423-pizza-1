import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, fillCart } from "@/common/test-utils";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import Vuex from "vuex";
import VueRouter from "vue-router";
import AppItemCounter from "@/common/components/AppItemCounter";
import priceFormat from "@/plugins/priceFormat";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(priceFormat);
localVue.use(VueRouter);
localVue.component("AppItemCounter", AppItemCounter);

describe("CartPizzaList", () => {
  let wrapper;
  let store;
  const stubs = ["AppPizzaDescription"];
  const createComponent = options => {
    wrapper = mount(CartPizzaList, options);
  };

  const routes = [
    {
      path: "/cart",
      component: CartPizzaList
    },
    {
      path: "/",
      component: {render: () => "-"}
    }
  ];
  const router = new VueRouter({ routes });

  beforeEach(() => {
    store = generateMockStore();
    fillCart(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store, stubs, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("list works", async () => {
    createComponent({ localVue, store, stubs, router });
    const getCounters = (wrapper) => wrapper.findAll(".cart-list__counter");
    const getPrices = (wrapper) => wrapper.findAll(".cart-list__price");
    let counters = getCounters(wrapper);
    let prices = getPrices(wrapper);
    expect(counters.length).toBe(2);
    expect(counters.at(0).find("input").element.value).toBe("1");
    expect(counters.at(1).find("input").element.value).toBe("2");
    expect(prices.at(0).text()).toBe("467 ₽");
    expect(prices.at(1).text()).toBe("1 904 ₽");

    await counters.at(0).find(".counter__button--minus").trigger("click");
    counters = getCounters(wrapper);
    prices = getPrices(wrapper);
    expect(counters.length).toBe(1);
    expect(prices.at(0).text()).toBe("1 904 ₽");

    await counters.at(0).find(".counter__button--plus").trigger("click");
    prices = getPrices(wrapper);
    expect(prices.at(0).text()).toBe("2 856 ₽");

    await wrapper.find(".cart-list__edit").trigger("click");
    expect(wrapper.vm.$route.path).toBe("/");
    expect(wrapper.vm.$route.query).toEqual({ edit: "2" });
  });
});
