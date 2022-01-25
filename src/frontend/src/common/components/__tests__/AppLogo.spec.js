import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import AppLogo from "@/common/components/AppLogo";

const localVue = createLocalVue();
localVue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: AppLogo
  },
  {
    path: "/other",
    component: {render: () => "-"}
  }
];
const router = new VueRouter({ routes });

describe("AppLogo", () => {
  let wrapper;
  const createComponent = options => {
    wrapper = mount(AppLogo, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, router });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("navigate to index", async () => {
    createComponent({ localVue, router });
    router.push("/other");
    await wrapper.find("[data-test='logo']").trigger("click");
    expect(wrapper.vm.$route.path).toBe("/");
  });
});
