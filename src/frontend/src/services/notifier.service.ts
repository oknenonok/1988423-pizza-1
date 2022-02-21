import notificationTypes from "@/common/enums/notificationTypes";
import store from "@/store";

export class Notifier {
  #store;
  constructor() {
    this.#store = store;
  }

  info(text: string) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: notificationTypes.INFO,
    });
  }

  success(text: string) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text: string) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: notificationTypes.ERROR,
    });
  }

  warning(text: string) {
    this.#store.dispatch("Notifications/createNotification", {
      text,
      type: notificationTypes.WARNING,
    });
  }
}

export default new Notifier();
