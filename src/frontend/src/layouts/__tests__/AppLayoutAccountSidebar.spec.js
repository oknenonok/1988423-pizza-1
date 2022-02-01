import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import VueRouter from "vue-router";
import AppLayoutAccountSidebar from "@/layouts/components/AppLayoutAccountSidebar";

const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [
  {
    path: "/orders",
    component: AppLayoutAccountSidebar,
  },
  {
    path: "/profile",
    component: { render: () => "-" },
  },
];
const router = new VueRouter({ routes });

describe("AppLayoutAccountSidebar", () => {
  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppLayoutAccountSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("navigation menu", async () => {
    router.push("/orders");
    createComponent({ localVue, router });
    const elements = wrapper.findAll(".layout__link");
    expect(elements.at(0).classes()).toContain("layout__link--active");
    await elements.at(1).trigger("click");
    expect(router.currentRoute.path).toBe("/profile");
  });
});
