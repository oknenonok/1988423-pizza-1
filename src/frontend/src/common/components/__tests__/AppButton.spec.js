import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import AppButton from "@/common/components/AppButton";

const localVue = createLocalVue();

describe("AppButton", () => {
  const propsData = {
    disabled: false,
    caption: "Caption"
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppButton, options);
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
