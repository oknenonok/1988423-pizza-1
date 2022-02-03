import {
  SET_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";
import { DELIVERY_TYPE_SELFTAKE } from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";

const setupState = () => ({
  rawOrders: [],
  ordersLoaded: false,
});

const ordersNamespace = {
  module: "Orders",
  entity: "rawOrders",
};

export default {
  namespaced: true,
  state: setupState(),

  getters: {
    /**
     * Все необходимые данные подгружены
     * @returns {boolean}
     */
    dataReady(state, getters, rootState) {
      return rootState.rawDough.length
        && rootState.rawIngredients.length
        && rootState.rawSauces.length
        && rootState.rawSizes.length
        && rootState.rawMisc.length;
    },

    /**
     * Заказы со всеми заполненными данными
     * @returns {array}
     */
    orders(state, getters, rootState, rootGetters) {
      if (!getters.dataReady) {
        return [];
      }
      return state.rawOrders.map(order => {
        let orderData = {
          ...order,
          orderPizzas: order.orderPizzas.map(pizza => {
            let pizzaData = {
              ...pizza,
              dough: rootGetters.dough.find((dough) => dough.id === pizza.doughId),
              sauce: rootGetters.sauces.find((sauce) => sauce.id === pizza.sauceId),
              size: rootGetters.sizes.find((size) => size.id === pizza.sizeId),
              ingredients: pizza.ingredients.map(ingredient => {
                return {
                  ...ingredient,
                  ...rootGetters.ingredients.find((ingredientData) => ingredientData.id === ingredient.ingredientId),
                };
              }),
            };
            pizzaData.price = calculatePizzaPrice({
              dough: pizzaData.dough,
              sauce: pizzaData.sauce,
              size: pizzaData.size,
              ingredientsPrice: calculateIngredientsPrice(pizzaData.ingredients),
            });
            return pizzaData;
          }),
          orderMisc: order.orderMisc ? order.orderMisc.map(misc => {
            return {
              ...misc,
              ...rootGetters.misc.find((miscData) => miscData.id === misc.miscId),
            };
          }): [],
        };
        orderData.price = orderData.orderPizzas.reduce((total, pizza) => total + pizza.price * pizza.quantity, 0)
          + orderData.orderMisc.reduce((total, misc) => total + misc.price * misc.quantity, 0);
        return orderData;
      }).sort((a, b) => a.id > b.id ? -1 : 1);
    }
  },

  actions: {
    /**
     * Подгрузить все необходимые для работы модуля данные
     * @param {object} context
     */
    async init({ dispatch }) {
      dispatch("loadMisc", null, {root: true});
      dispatch("loadDough", null, {root: true});
      dispatch("loadIngredients", null, {root: true});
      dispatch("loadSauces", null, {root: true});
      dispatch("loadSizes", null, {root: true});
      dispatch("load");
    },

    /**
     * Подгрузить заказы
     * @param {object} context
     */
    async load({ commit }) {
      commit(SET_ENTITY, {
        module: "Orders",
        entity: "ordersLoaded",
        value: false,
      }, { root: true });
      try {
        let orders = await this.$api.orders.query();
        commit(SET_ENTITY, {
          ...ordersNamespace,
          value: orders,
        }, { root: true });
        commit(SET_ENTITY, {
          module: "Orders",
          entity: "ordersLoaded",
          value: true,
        }, { root: true });
      } catch (e) {
        console.error(e);
      }
    },

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
            id: cartState.addressId,
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

        await this.$api.orders.post(payload);

        setCartStatus(orderCreateStatuses.SUCCESS);
      } catch (error) {
        setCartStatus(orderCreateStatuses.EDITING);
      }
    },


    /**
     * Удалить заказ
     * @param {object} context
     * @param {object} payload
     */
     async remove({ commit }, { id }) {
      await this.$api.orders.delete(id);
      commit(DELETE_ENTITY, {
        ...ordersNamespace,
        id,
      }, { root: true });
    },
  }
};
