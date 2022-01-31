import {
  shallowMount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  authenticateUser,
} from "@/tests/helpers";
import ProfileCard from "@/modules/profile/components/ProfileCard";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ProfileCard", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = shallowMount(ProfileCard, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    authenticateUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("card render correct", async () => {
    createComponent({ localVue, store });
    expect(wrapper.find(".user__name").text()).toBe("Вася Пупкин");
    expect(wrapper.find(".user__phone").text()).toBe("Контактный телефон: +7 977-777-7770");
  });
});
