import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import { generateMockStore } from "@/tests/helpers";
import AppNotifications from "@/common/components/AppNotifications";
import Vuex from "vuex";
import {
  ADD_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/store/mutations-types";
import notificationTypes from "@/common/enums/notificationTypes";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AppNotifications", () => {
  let wrapper;
  let store;
  const createComponent = (options) => {
    wrapper = mount(AppNotifications, options);
  };

  beforeEach(() => {
    store = generateMockStore();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("rendered", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  it("show close notification", async () => {
    store.commit(`Notifications/${ADD_NOTIFICATION}`, {
      id: 1,
      text: "test notification",
      type: notificationTypes.SUCCESS,
    });
    createComponent({ localVue, store });
    const element = wrapper.find(".notification");
    expect(element.html()).toContain("test notification");
    expect(element.classes()).toContain("notification--success");
    const spyOnMutation = jest.spyOn(wrapper.vm, DELETE_NOTIFICATION);
    await element.trigger("click");
    expect(spyOnMutation).toHaveBeenCalledWith(1);
  });
});
