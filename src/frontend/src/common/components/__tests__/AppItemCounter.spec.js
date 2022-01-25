import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  const propsData = {
    minValue: 0,
    maxValue: 2,
    value: 0,
    counterButtonClass: "newClass",
  };

  let wrapper;
  const createComponent = options => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("values changing by buttons", async () => {
    createComponent({ propsData });
    const element = wrapper.find("input[type='number']");
    const buttonMinus = wrapper.find("[data-test='minus']");
    const buttonPlus = wrapper.find("[data-test='plus']");

    expect(buttonMinus.element.disabled).toBeTruthy();
    expect(buttonPlus.element.disabled).toBeFalsy();
    expect(element.element.value).toBe("0");
    expect(buttonPlus.attributes("class")).toContain("newClass");
    await buttonPlus.trigger("click");
    expect(wrapper.emitted("input")[0][0]).toBe(1);

    await wrapper.setProps({ value: 1 })
    expect(buttonMinus.element.disabled).toBeFalsy();
    expect(buttonPlus.element.disabled).toBeFalsy();
    expect(element.element.value).toBe("1");
    await buttonPlus.trigger("click");
    expect(wrapper.emitted("input")[1][0]).toBe(2);

    await wrapper.setProps({ value: 2 })
    expect(buttonMinus.element.disabled).toBeFalsy();
    expect(buttonPlus.element.disabled).toBeTruthy();
    expect(element.element.value).toBe("2");
    await buttonMinus.trigger("click");
    expect(wrapper.emitted("input")[2][0]).toBe(1);
  });

  it("values changing directly", async () => {
    createComponent({ propsData });
    const element = wrapper.find("input[type='number']");
    await element.setValue("2");
    expect(element.element.value).toBe("2");
    expect(wrapper.emitted("input")[0][0]).toBe(2);

    await element.setValue("5");
    expect(wrapper.emitted("input")[1][0]).toBe(2);

    await element.setValue("x");
    expect(wrapper.emitted("input")[2][0]).toBe(0);
  });
});
