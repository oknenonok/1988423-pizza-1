import { SET_ENTITY } from "@/store/mutations-types";
import { DELIVERY_TYPE_SELFTAKE } from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";

export default {
  namespaced: true,

  actions: {
    /**
     * Создать заказ из корзины
     * @param {object} context
     */
    async createOrder({ commit, rootState, rootGetters }) {
      const setCartStatus = (status) => {
        commit(SET_ENTITY, {
          module: "Cart",
          entity: "orderCreateStatus",
          value: status,
        }, { root: true });
      };

      setCartStatus(orderCreateStatuses.SENDING);

      try {
        let cartState = rootState.Cart;
        let user = rootState.Auth.user;
        let payload = {
          userId: user ? user.id : null,
          phone: cartState.phone,
          address: cartState.deliveryType === DELIVERY_TYPE_SELFTAKE ? null : {
            street: cartState.street,
            building: cartState.building,
            flat: cartState.flat,
            comment: cartState.comment,
          },
          pizzas: cartState.cartItems.map(item => ({
            name: item.name,
            sauceId: item.sauce.id,
            doughId: item.dough.id,
            sizeId: item.size.id,
            quantity: item.quantity,
            ingredients: item.ingredients.map(ingredient => ({
              ingredientId: ingredient.id,
              quantity: ingredient.quantity,
            })),
          })),
          misc: rootGetters["Cart/chosenMisc"].map(misc => ({
            miscId: misc.id,
            quantity: misc.quantity,
          })),
        };

        //TODO: отправлять это добро в апи
        console.log(payload);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCartStatus(orderCreateStatuses.SUCCESS);
      } catch (error) {
        setCartStatus(orderCreateStatuses.EDITING);
      }
    },
  }
};
