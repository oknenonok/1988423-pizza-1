import { shallowMount } from "@vue/test-utils";
import AppPopup from "@/common/components/AppPopup";

describe("AppPopup", () => {
  const propsData = {
    isOpen: false,
  };
  const slots = {
    default: "slot",
  }

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppPopup, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ propsData, slots });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("dialog hidden", () => {
    createComponent({ propsData, slots });
    expect(wrapper.text()).toBe("");
    expect(wrapper.find(".dialog").exists()).toBeFalsy();
    expect(wrapper.find(".dialog-overlay").exists()).toBeFalsy();
  });

  it("dialog open", () => {
    propsData.isOpen = true;
    createComponent({ propsData, slots });
    expect(wrapper.find(".dialog").exists()).toBeTruthy();
    expect(wrapper.find(".dialog").text()).toBe("slot");
    expect(wrapper.find(".dialog-overlay").exists()).toBeTruthy();
  });
});
