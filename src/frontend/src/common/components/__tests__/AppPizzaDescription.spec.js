import { shallowMount } from "@vue/test-utils";
import AppPizzaDescription from "@/common/components/AppPizzaDescription";

describe("AppPizzaDescription", () => {
  const propsData = {
    item: {
      name: "Pizza name",
      dough: { caption: "Dough name" },
      size: { name: "Size name" },
      sauce: { name: "Sauce name" },
      ingredients: [
        {
          name: "Ingredient 1",
          quantity: 1,
        },
        {
          name: "Ingredient 2",
          quantity: 2,
        },
      ]
    }
  };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppPizzaDescription, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ propsData });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("all fields correct", () => {
    createComponent({ propsData });
    expect(wrapper.find("[data-test='pizzaName']").text()).toBe("Pizza name");
    expect(wrapper.find("[data-test='pizzaSize']").text()).toBe("Size name, Dough name");
    expect(wrapper.find("[data-test='pizzaSauce']").text()).toBe("Соус: sauce name");
    expect(wrapper.find("[data-test='pizzaIngredients']").text()).toContain("ingredient 1, ingredient 2 (x2)");
  });
});
