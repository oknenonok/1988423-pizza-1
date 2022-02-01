import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import AppInput from "@/common/components/AppInput";
import VueTheMask from "vue-the-mask";

const localVue = createLocalVue();
localVue.use(VueTheMask);

describe("AppInput", () => {
  const propsData = {
    value: "testValue",
    name: "test",
    placeholder: "Test",
    required: true,
    disabled: false,
    caption: "Caption",
    hideCaption: false,
    inputMask: "",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = mount(AppInput, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("It emits an input event when typing", async () => {
    createComponent({ propsData });
    let input = wrapper.find("input");
    await input.trigger("input");
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it("correct props", () => {
    createComponent({ localVue, propsData });
    const element = wrapper.find("input").element;
    expect(element.value).toBe("testValue");
    expect(element.name).toBe("test");
    expect(element.type).toBe("text");
    expect(element.placeholder).toBe("Test");
    expect(element.required).toBe(true);
    expect(element.disabled).toBe(false);
    expect(wrapper.find("[data-test='caption']").html()).toContain("Caption");
  });

  it("no caption", () => {
    createComponent({ localVue, propsData: {
      ...propsData,
      caption: "",
    }});
    expect(wrapper.find("[data-test='caption']").exists()).toBeFalsy();
  });

  it("hidden caption", () => {
    createComponent({ localVue, propsData: {
      ...propsData,
      hideCaption: true,
    }});
    let element = wrapper.find("[data-test='caption']");
    expect(element.html()).toContain("Caption");
    expect(element.attributes("class")).toContain("visually-hidden");
  });

  it("masking", async () => {
    createComponent({ localVue, propsData: {
      ...propsData,
      inputMask: "+7 ###-###-##-##",
      value: "+79001234567",
    }});
    const element = wrapper.find("input");
    expect(element.element.value).toBe("+7 900-123-45-67");
    await element.setValue("79001234568");
    expect(element.element.value).toBe("+7 900-123-45-68");
    await element.setValue("error");
    expect(element.element.value).toBe("+7 ");
  });
});
