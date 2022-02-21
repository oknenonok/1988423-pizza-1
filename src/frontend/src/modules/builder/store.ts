import {
  Getters,
  Mutations,
  Actions,
  Module,
  Context,
} from "vuex-smart-module";
import Vue from "vue";
import { DEFAULT_DOUGH, DEFAULT_SIZE, DEFAULT_SAUCE } from "@/common/constants";
import {
  RESET_STATE,
  RESET_STATE_TO_CART_ITEM,
  SET_INGREDIENT_QUANTITY,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_PIZZA_NAME,
} from "@/store/mutations-types";
import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";
import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";
import { Store } from "vuex";
import RootModule from "@/store/root-module";
import CartModule from "@/modules/cart/store";
import { ICartIngredient, ICartItem } from "@/common/types";

class BuilderState {
  chosenDoughId = DEFAULT_DOUGH;
  chosenSizeId = DEFAULT_SIZE;
  chosenSauceId = DEFAULT_SAUCE;
  chosenIngredientsById: { [key: number]: number } = {};
  pizzaName = "";
}

class BuilderGetters extends Getters<BuilderState> {
  RootModule!: Context<typeof RootModule>;

  $init(store: Store<BuilderState>): void {
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
      this.RootModule.state.rawSizes.length
    );
  }

  /**
   * Объект - выбранное тесто
   * @returns {object}
   */
  get chosenDough() {
    return this.RootModule.getters.dough.find(
      (dough) => dough.id === this.state.chosenDoughId
    );
  }

  /**
   * Объект - выбранный соус
   * @returns {object}
   */
  get chosenSauce() {
    return this.RootModule.getters.sauces.find(
      (sauce) => sauce.id === this.state.chosenSauceId
    );
  }

  /**
   * Объект - выбранный размер
   * @returns {object}
   */
  get chosenSize() {
    return this.RootModule.getters.sizes.find(
      (size) => size.id === this.state.chosenSizeId
    );
  }

  /**
   * Массив - выбранные ингредиенты
   * @returns {array}
   */
  get chosenIngredients(): ICartIngredient[] {
    return this.RootModule.getters.ingredients
      .filter((ingredient) => this.state.chosenIngredientsById[ingredient.id])
      .map((ingredient) => {
        return {
          ...ingredient,
          quantity: this.getters.getIngredientQuantity(ingredient.id),
        };
      });
  }

  /**
   * Замыкание для количества ингредиента на пицце
   * @param {object} state
   * @returns {function}
   */
  get getIngredientQuantity() {
    return (ingredientId: number) => {
      return this.state.chosenIngredientsById[ingredientId] ?? 0;
    };
  }

  /**
   * Стоимость всех ингредиентов на пицце
   * @returns {number}
   */
  get chosenIngredientsPrice() {
    return calculateIngredientsPrice(this.getters.chosenIngredients);
  }

  /**
   * Итоговая цена пиццы
   * @returns {number}
   */
  get price() {
    return calculatePizzaPrice({
      dough: this.getters.chosenDough,
      sauce: this.getters.chosenSauce,
      size: this.getters.chosenSize,
      ingredientsPrice: this.getters.chosenIngredientsPrice,
    });
  }
}

class BuilderMutations extends Mutations<BuilderState> {
  /**
   * Обновить количество ингредиента на пицце
   * @param {object} state
   * @param {object} payload
   */
  [SET_INGREDIENT_QUANTITY]({
    ingredientId,
    quantity,
  }: {
    ingredientId: number;
    quantity: number;
  }) {
    if (quantity > 0) {
      Vue.set(this.state.chosenIngredientsById, ingredientId, +quantity);
    } else {
      Vue.delete(this.state.chosenIngredientsById, ingredientId);
    }
  }

  /**
   * Выбрать тесто
   * @param {object} state
   * @param {number} doughId
   */
  [SET_DOUGH](doughId: number) {
    this.state.chosenDoughId = +doughId;
  }

  /**
   * Выбрать размер
   * @param {object} state
   * @param {number} doughId
   */
  [SET_SIZE](sizeId: number) {
    this.state.chosenSizeId = +sizeId;
  }

  /**
   * Выбрать соус
   * @param {object} state
   * @param {number} doughId
   */
  [SET_SAUCE](sauceId: number) {
    this.state.chosenSauceId = +sauceId;
  }

  /**
   * Установить название пиццы
   * @param {object} state
   * @param {number} doughId
   */
  [SET_PIZZA_NAME](name: string) {
    this.state.pizzaName = name;
  }

  /**
   * Сбросить состояние
   * @param {object} state
   */
  [RESET_STATE]() {
    const emptyState = new BuilderState();
    Object.assign(this.state, emptyState);
  }

  /**
   * Установить состояние из строки корзины
   * @param {object} state
   * @param {object} cartItem
   */
  [RESET_STATE_TO_CART_ITEM](cartItem: ICartItem) {
    Object.assign(this.state, {
      chosenDoughId: cartItem.dough?.id ?? DEFAULT_DOUGH,
      chosenSizeId: cartItem.size?.id ?? DEFAULT_SIZE,
      chosenSauceId: cartItem.sauce?.id ?? DEFAULT_SAUCE,
      chosenIngredientsById: cartItem.ingredients.reduce(
        (result, item) => ({
          ...result,
          [item.id]: item.quantity,
        }),
        {}
      ),
      pizzaName: cartItem.name,
    });
  }
}

class BuilderActions extends Actions<
  BuilderState,
  BuilderGetters,
  BuilderMutations,
  BuilderActions
> {
  RootModule!: Context<typeof RootModule>;
  CartModule!: Context<typeof CartModule>;

  $init(store: Store<BuilderState>): void {
    this.RootModule = RootModule.context(store);
    this.CartModule = CartModule.context(store);
  }

  /**
   * Подгрузить все необходимые для работы модуля данные
   * @param {object} context
   */
  async init() {
    this.RootModule.dispatch("loadDough", null);
    this.RootModule.dispatch("loadIngredients", null);
    this.RootModule.dispatch("loadSauces", null);
    this.RootModule.dispatch("loadSizes", null);
  }

  /**
   * Обновить строку корзины из текущих данных конструктора
   * @param {object} context
   * @param {number} cartItemId
   */
  updateCart(cartItemId: number) {
    const cartItem = this.CartModule.state.cartItems.find(
      (item) => item.id === cartItemId
    );
    if (cartItem) {
      this.CartModule.actions.addToCart({
        ...cartItem,
        name: this.state.pizzaName,
        sauce: this.getters.chosenSauce,
        dough: this.getters.chosenDough,
        size: this.getters.chosenSize,
        ingredients: this.getters.chosenIngredients,
      });
    }
  }
}

export default new Module({
  state: BuilderState,
  getters: BuilderGetters,
  mutations: BuilderMutations,
  actions: BuilderActions,
});
