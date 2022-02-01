import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppRadioButton", () => {
  const propsData = {
    name: "name",
    value: "value",
    checked: false,
    inputClass: "inputClass",
  };
  const slots = {
    default: "slot",
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("works correctly", async () => {
    createComponent({ propsData, slots });
    const element = wrapper.find("input[type=radio]");
    expect(wrapper.text()).toBe("slot");
    expect(element.element.value).toBe("value");
    expect(element.element.name).toBe("name");
    expect(element.element.checked).toBeFalsy();
    expect(element.classes()).toContain("inputClass");
    await element.trigger("change");
    expect(wrapper.emitted("select")[0]).toEqual(["value"]);
  });
});
