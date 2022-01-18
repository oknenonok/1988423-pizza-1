import {
  RESET_STATE,
  SET_ENTITY,
} from "@/store/mutations-types";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";

export default (store) => {
  if (store.state.Cart.orderCreateStatus === orderCreateStatuses.SUCCESS) {
    store.commit(`Cart/${RESET_STATE}`);
  } else if (store.state.Cart === orderCreateStatuses.SENDING) {
    store.commit(SET_ENTITY, {
      module: "Cart",
      entity: "orderCreateStatus",
      value: orderCreateStatuses.EDITING,
    }, { root: true });
  }
};
