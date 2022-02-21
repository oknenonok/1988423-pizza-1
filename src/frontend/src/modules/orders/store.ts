import {
  Getters,
  Mutations,
  Actions,
  Module,
  Context,
} from "vuex-smart-module";
import { DELIVERY_TYPE_SELFTAKE } from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";
import RootModule from "@/store/root-module";
import CartModule from "@/modules/cart/store";
import AuthModule from "@/modules/auth/store";
import { Store } from "vuex";
import api from "@/services/api.service";
import {
  ILocalOrder,
  ILocalOrderMisc,
  ILocalOrderPizza,
  ILocalOrderPizzaIngredient,
  IOrder,
  INewOrder,
} from "@/common/types";
import { deleteEntity } from "@/store/helpers";

class OrdersState {
  rawOrders: IOrder[] = [];
  ordersLoaded = false;
}

class OrdersGetters extends Getters<OrdersState> {
  RootModule!: Context<typeof RootModule>;

  $init(store: Store<OrdersState>): void {
    this.RootModule = RootModule.context(store);
  }

  /**
   * Все необходимые данные подгружены
   * @returns {boolean}
   */
  get dataReady(): boolean {
    return !!(
      this.RootModule.state.rawDough.length &&
      this.RootModule.state.rawIngredients.length &&
      this.RootModule.state.rawSauces.length &&
      this.RootModule.state.rawSizes.length &&
      this.RootModule.state.rawMisc.length
    );
  }

  /**
   * Заказы со всеми заполненными данными
   * @returns {array}
   */
  get orders(): ILocalOrder[] {
    if (!this.getters.dataReady) {
      return [];
    }
    return this.state.rawOrders
      .map((order) => {
        const mappedMisc = (
          order.orderMisc
            ? order.orderMisc
                .map((pizzaMisc) => {
                  const misc = this.RootModule.getters.misc.find(
                    (miscData) => miscData.id === pizzaMisc.miscId
                  );
                  if (misc) {
                    return {
                      ...pizzaMisc,
                      ...misc,
                    };
                  }
                })
                .filter((item) => item)
            : []
        ) as ILocalOrderMisc[];
        const orderData: ILocalOrder = {
          ...order,
          orderPizzas: order.orderPizzas
            ? order.orderPizzas.map((pizza) => {
                const mappedIngredients: ILocalOrderPizzaIngredient[] =
                  pizza.ingredients
                    .map((pizzaIngredient) => {
                      const ingredient =
                        this.RootModule.getters.ingredients.find(
                          (ingredientData) =>
                            ingredientData.id === pizzaIngredient.ingredientId
                        );
                      if (ingredient) {
                        return {
                          ...pizzaIngredient,
                          ...ingredient,
                        };
                      }
                    })
                    .filter((item) => item) as ILocalOrderPizzaIngredient[];
                const pizzaData: ILocalOrderPizza = {
                  ...pizza,
                  dough: this.RootModule.getters.dough.find(
                    (dough) => dough.id === pizza.doughId
                  ),
                  sauce: this.RootModule.getters.sauces.find(
                    (sauce) => sauce.id === pizza.sauceId
                  ),
                  size: this.RootModule.getters.sizes.find(
                    (size) => size.id === pizza.sizeId
                  ),
                  ingredients: mappedIngredients,
                  price: 0,
                };
                pizzaData.price = calculatePizzaPrice({
                  dough: pizzaData.dough,
                  sauce: pizzaData.sauce,
                  size: pizzaData.size,
                  ingredientsPrice: calculateIngredientsPrice(
                    pizzaData.ingredients
                  ),
                });
                return pizzaData;
              })
            : [],
          orderMisc: mappedMisc,
          price: 0,
        };
        orderData.price =
          orderData.orderPizzas.reduce(
            (total, pizza) => total + pizza.price * pizza.quantity,
            0
          ) +
          orderData.orderMisc.reduce(
            (total, misc) => total + misc.price * misc.quantity,
            0
          );
        return orderData;
      })
      .sort((a, b) => (a.id > b.id ? -1 : 1));
  }
}

class OrdersMutations extends Mutations<OrdersState> {
  setOrdersLoaded(ordersLoaded: boolean) {
    this.state.ordersLoaded = ordersLoaded;
  }

  setOrders(orders: IOrder[]) {
    this.state.rawOrders = orders;
  }

  deleteCartItem(id: IOrder["id"]) {
    deleteEntity(this.state, "rawOrders", id);
  }
}

class OrdersActions extends Actions<
  OrdersState,
  OrdersGetters,
  OrdersMutations,
  OrdersActions
> {
  RootModule!: Context<typeof RootModule>;
  CartModule!: Context<typeof CartModule>;
  AuthModule!: Context<typeof AuthModule>;

  $init(store: Store<OrdersState>): void {
    this.RootModule = RootModule.context(store);
    this.CartModule = CartModule.context(store);
    this.AuthModule = AuthModule.context(store);
  }
  /**
   * Подгрузить все необходимые для работы модуля данные
   * @param {object} context
   */
  async init() {
    this.RootModule.actions.loadMisc();
    this.RootModule.actions.loadDough();
    this.RootModule.actions.loadIngredients();
    this.RootModule.actions.loadSauces();
    this.RootModule.actions.loadSizes();
    this.actions.load();
  }

  /**
   * Подгрузить заказы
   * @param {object} context
   */
  async load() {
    this.commit("setOrdersLoaded", false);
    try {
      const orders = await api.orders.query();
      this.commit("setOrders", orders);
      this.commit("setOrdersLoaded", true);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Создать заказ из корзины
   * @param {object} context
   */
  async createOrder() {
    this.CartModule.commit("setStatus", orderCreateStatuses.SENDING);

    try {
      const cartState = this.CartModule.state;
      const user = this.AuthModule.state.user;
      const payload: INewOrder = {
        userId: user ? user.id : null,
        phone: cartState.phone,
        address:
          cartState.deliveryType === DELIVERY_TYPE_SELFTAKE
            ? null
            : {
                id: cartState.addressId,
                street: cartState.street,
                building: cartState.building,
                flat: cartState.flat,
                comment: cartState.comment,
              },
        pizzas: cartState.cartItems.map((item) => ({
          name: item.name,
          sauceId: item.sauce?.id,
          doughId: item.dough?.id,
          sizeId: item.size?.id,
          quantity: item.quantity,
          ingredients: item.ingredients.map((ingredient) => ({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
          })),
        })),
        misc: this.CartModule.getters.chosenMisc.map((misc) => ({
          miscId: misc.id,
          quantity: misc.quantity,
        })),
      };

      await api.orders.post(payload);

      this.CartModule.commit("setStatus", orderCreateStatuses.SUCCESS);
    } catch (error) {
      this.CartModule.commit("setStatus", orderCreateStatuses.EDITING);
    }
  }

  /**
   * Удалить заказ
   * @param {object} context
   * @param {object} payload
   */
  async remove({ id }: IOrder) {
    await api.orders.delete(id);
    this.commit("deleteCartItem", id);
  }
}

export default new Module({
  state: OrdersState,
  getters: OrdersGetters,
  mutations: OrdersMutations,
  actions: OrdersActions,
});
