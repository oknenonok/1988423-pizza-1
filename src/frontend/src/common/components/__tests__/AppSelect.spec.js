import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import AppSelect from "@/common/components/AppSelect";

const localVue = createLocalVue();

describe("AppSelect", () => {
  const propsData = {
    value: 2,
    name: "test",
    required: true,
    disabled: false,
    options: [
      {
        key: 1,
        title: "option 1",
      },
      {
        key: 2,
        title: "option 2",
      },
    ],
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppSelect, options);
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
    const element = wrapper.find("select").element;
    expect(element.value).toBe("2");
    expect(element.name).toBe("test");
    expect(element.required).toBe(true);
    expect(element.disabled).toBe(false);
    expect(wrapper.find("option[value='2']").element.selected).toBeTruthy;
  });

  it("It emits an input event when option selected", async () => {
    createComponent({ propsData });
    await wrapper.find("option[value='1']").trigger("change");
    expect(wrapper.find("option[value='1']").element.selected).toBeTruthy;
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
