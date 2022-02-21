import {
  Getters,
  Mutations,
  Actions,
  Module,
  Context,
} from "vuex-smart-module";
import Vue from "vue";
import {
  PUSH_TO_CART,
  SET_MISC_QUANTITY,
  SET_DELIVERY_TYPE,
  SET_DELIVERY_ADDRESS,
  RESET_STATE,
  RESET_STATE_TO_ORDER,
} from "@/store/mutations-types";
import { DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW } from "@/common/constants";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";
import RootModule from "@/store/root-module";
import AuthModule from "@/modules/auth/store";
import AddressesModule from "@/modules/addresses/store";
import { Store } from "vuex";
import { IAddress, ICartItem, ICartMisc, IOrder } from "@/common/types";
import { updateEntity, deleteEntity } from "@/store/helpers";

class CartState {
  cartItems: ICartItem[] = [];
  chosenMiscById: { [key: number]: number } = {};
  deliveryType: string = DELIVERY_TYPE_SELFTAKE;
  phone = "";
  street = "";
  building = "";
  flat = "";
  comment = "";
  addressId: IAddress["id"] | null = null;
  orderCreateStatus: number = orderCreateStatuses.EDITING;
}

class CartGetters extends Getters<CartState> {
  RootModule!: Context<typeof RootModule>;

  $init(store: Store<CartState>): void {
    this.RootModule = RootModule.context(store);
  }

  /**
   * Необходимые для работы данные подгружены
   * @returns {boolean}
   */
  get dataReady(): boolean {
    return !!this.RootModule.state.rawMisc.length;
  }

  /**
   * Пуста ли корзина
   * @returns {number}
   */
  get isCartEmpty(): boolean {
    return (
      this.state.cartItems.length === 0 && this.getters.chosenMisc.length === 0
    );
  }

  /**
   * Стоимость всех товаров в корзине
   * @returns {number}
   */
  get price(): number {
    return this.getters.pizzasPrice + this.getters.miscPrice;
  }

  /**
   * Стоимость всех пицц в корзине
   * @returns {number}
   */
  get pizzasPrice(): number {
    return this.state.cartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  /**
   * Стоимость дополнительных товаров в корзине
   * @returns {number}
   */
  get miscPrice(): number {
    return this.getters.chosenMisc.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  /**
   * Выбранные дополнительные товары
   * @returns {array}
   */
  get chosenMisc(): ICartMisc[] {
    return this.RootModule.getters.misc
      .filter((misc) => this.state.chosenMiscById[misc.id])
      .map((misc) => ({
        ...misc,
        quantity: this.getters.getMiscQuantity(misc.id),
      }));
  }

  /**
   * Замыкание для количества дополнительного товара в корзине
   * @returns {function}
   */
  get getMiscQuantity() {
    return (miscId: number): number => {
      return this.state.chosenMiscById[miscId] ?? 0;
    };
  }
}

class CartMutations extends Mutations<CartState> {
  /**
   * Добавить пиццу в корзину
   * @param {object} item
   */
  [PUSH_TO_CART](item: ICartItem) {
    this.state.cartItems.push(item);
  }

  /**
   * Обновить количество дополнительного товара
   * @param {object} payload
   */
  [SET_MISC_QUANTITY]({ id, quantity }: { id: number; quantity: number }) {
    if (quantity > 0) {
      Vue.set(this.state.chosenMiscById, id, +quantity);
    } else {
      Vue.delete(this.state.chosenMiscById, id);
    }
  }

  /**
   * Выбрать способ получения
   * @param {string|number} deliveryType
   */
  [SET_DELIVERY_TYPE](deliveryType: string) {
    this.state.deliveryType = deliveryType;
  }

  [SET_DELIVERY_ADDRESS](address: IAddress | null) {
    if (address) {
      this.state.addressId = address.id;
      this.state.street = address.street;
      this.state.building = address.building;
      this.state.flat = address.flat;
      this.state.comment = address.comment;
    } else {
      this.state.addressId = null;
      this.state.street = "";
      this.state.building = "";
      this.state.flat = "";
      this.state.comment = "";
    }
  }

  /**
   * Сбросить состояние
   */
  [RESET_STATE]() {
    const currentPhone = this.state.phone;
    const emptyState = new CartState();
    Object.assign(this.state, emptyState);
    if (currentPhone) {
      this.state.phone = currentPhone;
    }
  }

  /**
   * Установить состояние из заказа
   * @param {object} cartItem
   */
  [RESET_STATE_TO_ORDER](order: IOrder) {
    Object.assign(this.state, {
      cartItems: order.orderPizzas,
      chosenMiscById: order.orderMisc.reduce(
        (result, misc) => ({
          ...result,
          [misc.miscId]: misc.quantity,
        }),
        {}
      ),
      deliveryType: order.addressId ?? DELIVERY_TYPE_SELFTAKE,
      phone: order.phone,
      street: order?.orderAddress?.street ?? "",
      building: order?.orderAddress?.building ?? "",
      flat: order?.orderAddress?.flat ?? "",
      comment: order?.orderAddress?.comment ?? "",
      addressId: order.addressId,
      orderCreateStatus: orderCreateStatuses.EDITING,
    });
  }

  setPhone(phone: string) {
    this.state.phone = phone;
  }

  updateCartItem(item: ICartItem) {
    updateEntity(this.state, "cartItems", item);
  }

  deleteCartItem(id: ICartItem["id"]) {
    deleteEntity(this.state, "cartItems", id);
  }

  setStatus(status: number) {
    this.state.orderCreateStatus = status;
  }

  setEntity({
    name,
    value,
  }: {
    name: "phone" | "street" | "building" | "flat";
    value: string;
  }) {
    this.state[name] = value;
  }
}

class CartActions extends Actions<
  CartState,
  CartGetters,
  CartMutations,
  CartActions
> {
  RootModule!: Context<typeof RootModule>;
  AuthModule!: Context<typeof AuthModule>;
  AddressesModule!: Context<typeof AddressesModule>;

  $init(store: Store<CartState>): void {
    this.RootModule = RootModule.context(store);
    this.AuthModule = AuthModule.context(store);
    this.AddressesModule = AddressesModule.context(store);
  }

  /**
   * Подгрузить все необходимые для работы модуля данные
   * @param {object} context
   */
  async init() {
    this.RootModule.dispatch("loadMisc");
    if (this.AuthModule.state.user) {
      this.AddressesModule.actions.load();
    }
  }

  /**
   * Подгрузить данные для расчета стоимости
   * @param {object} context
   */
  async loadDataForCalculation() {
    if (Object.keys(this.state.chosenMiscById).length > 0) {
      this.RootModule.dispatch("loadMisc", null);
    }
  }

  /**
   * Добавить или обновить строку корзины
   * @param {object} context
   * @param {object} payload
   */
  addToCart({
    id,
    name,
    sauce,
    dough,
    size,
    ingredients,
    quantity,
  }: Partial<ICartItem>) {
    const payload: ICartItem = {
      name: name || "",
      sauce,
      dough,
      size,
      ingredients: ingredients ?? [],
      id: id ?? Math.max(...this.state.cartItems.map((item) => item.id), 0) + 1,
      quantity: quantity ?? 1,
      price: calculatePizzaPrice({
        sauce,
        dough,
        size,
        ingredientsPrice: calculateIngredientsPrice(ingredients ?? []),
      }),
    };
    if (id) {
      this.commit("updateCartItem", payload);
    } else {
      this.commit(PUSH_TO_CART, payload);
    }
  }

  /**
   * Обновить количество строки корзины
   * @param {object} context
   * @param {object} payload
   */
  updateQuantity({ item, quantity }: { item: ICartItem; quantity: number }) {
    if (quantity) {
      this.commit("updateCartItem", {
        ...item,
        quantity,
      });
    } else {
      this.commit("deleteCartItem", item.id);
    }
  }

  setDeliveryInfo(deliveryType: string) {
    this.commit(SET_DELIVERY_TYPE, deliveryType);
    if (![DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].includes(deliveryType)) {
      const address = this.AddressesModule.state.addresses.find(
        (address) => address.id === +deliveryType
      );
      if (address) {
        this.commit(SET_DELIVERY_ADDRESS, address);
      }
    } else {
      this.commit(SET_DELIVERY_ADDRESS, null);
    }
  }
}

export default new Module({
  state: CartState,
  getters: CartGetters,
  mutations: CartMutations,
  actions: CartActions,
});
