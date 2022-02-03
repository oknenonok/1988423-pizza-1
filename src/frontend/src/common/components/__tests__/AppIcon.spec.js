import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import AppIcon from "@/common/components/AppIcon";

const localVue = createLocalVue();

describe("AppIcon", () => {
  const propsData = {
    disabled: false,
    caption: "Caption"
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppIcon, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("correct props", () => {
    createComponent({ localVue, propsData });
    const element = wrapper.element;
    expect(element.type).toBe("button");
    expect(element.disabled).toBe(false);
    expect(wrapper.text()).toBe("Caption");
  });
});
