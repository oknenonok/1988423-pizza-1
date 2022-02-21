import { Getters, Mutations, Actions, Module } from "vuex-smart-module";
import { uniqueId } from "lodash";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "@/store/mutations-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";
import { INotification } from "@/common/types";

class NotificationsState {
  notifications: INotification[] = [];
}

class NotificationsGetters extends Getters<NotificationsState> {}

class NotificationsMutations extends Mutations<NotificationsState> {
  /**
   * Добавление уведомления
   * @param {object} state
   * @param {object} notification
   */
  [ADD_NOTIFICATION](notification: INotification) {
    this.state.notifications = [notification, ...this.state.notifications];
  }

  /**
   * Удаление уведомления
   * @param {object} state
   * @param {string} id
   */
  [DELETE_NOTIFICATION](id: number) {
    this.state.notifications = this.state.notifications.filter(
      (notification) => notification.id !== id
    );
  }
}

class NotificationsActions extends Actions<
  NotificationsState,
  NotificationsGetters,
  NotificationsMutations,
  NotificationsActions
> {
  /**
   * Создать уведомление
   * @param {object} context
   * @param {object} payload
   */
  async createNotification({ ...notification }: INotification) {
    const uniqueNotification = {
      ...notification,
      id: +uniqueId(),
    };
    this.commit(ADD_NOTIFICATION, uniqueNotification);
    setTimeout(
      () => this.commit(DELETE_NOTIFICATION, uniqueNotification.id),
      MESSAGE_LIVE_TIME
    );
  }
}

export default new Module({
  state: NotificationsState,
  getters: NotificationsGetters,
  mutations: NotificationsMutations,
  actions: NotificationsActions,
});
