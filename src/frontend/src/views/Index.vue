<template>
  <main class="content">
    <form action="#" method="post" @submit.prevent="addToCart">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="dough"
            :chosen-dough-id="chosenDoughId"
            @select="selectDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="sizes"
            :chosen-size-id="chosenSizeId"
            @select="selectSize"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            :chosen-sauce-id="chosenSauceId"
            @selectSauce="selectSauce"
            @changeIngredient="changeIngredient"
          />
        </div>

        <div class="content__pizza">
          <AppInput
            type="text"
            name="pizza_name"
            v-model="pizzaName"
            placeholder="Введите название пиццы"
            caption="Название пиццы"
            hide-caption
          />

          <div class="content__constructor">
            <BuilderPizzaView
              :ingredients="ingredients"
              :chosen-dough="chosenDough"
              :chosen-sauce="chosenSauce"
              :chosen-ingredients="chosenIngredients"
              @dropIngredient="changeIngredient"
            />
          </div>

          <BuilderPriceCounter
            class="content__result"
            :price="price"
            :can-cook="canCook"
          />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import {
  DEFAULT_DOUGH,
  DEFAULT_SIZE,
  DEFAULT_SAUCE,
  MAPPING_DOUGH,
  MAPPING_SIZE,
  MAPPING_SAUCE,
} from "@/common/constants";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      dough: dough.map((dough) =>
        Object.assign(
          {
            value: MAPPING_DOUGH[dough.id],
          },
          dough
        )
      ),

      ingredients: ingredients.map((ingredient) =>
        Object.assign(
          {
            value: ingredient.image.replace(/^.*\//, "").replace(".svg", ""),
            count: 0,
          },
          ingredient
        )
      ),

      sauces: sauces.map((sauce) =>
        Object.assign(
          {
            value: MAPPING_SAUCE[sauce.id],
          },
          sauce
        )
      ),

      sizes: sizes.map((size) =>
        Object.assign(
          {
            value: MAPPING_SIZE[size.id],
          },
          size
        )
      ),

      chosenDoughId: DEFAULT_DOUGH,
      chosenSizeId: DEFAULT_SIZE,
      chosenSauceId: DEFAULT_SAUCE,
      pizzaName: "",
    };
  },

  computed: {
    /**
     * Объект - выбранное тесто
     * @returns {object}
     */
    chosenDough() {
      return this.dough.find((dough) => dough.id === this.chosenDoughId);
    },

    /**
     * Объект - выбранный соус
     * @returns {object}
     */
    chosenSauce() {
      return this.sauces.find((sauce) => sauce.id === this.chosenSauceId);
    },

    /**
     * Объект - выбранный размер
     * @returns {object}
     */
    chosenSize() {
      return this.sizes.find((size) => size.id === this.chosenSizeId);
    },

    /**
     * Массив объектов с выбранными ингредиентами
     * @returns {array}
     */
    chosenIngredients() {
      return this.ingredients.filter((ingredient) => ingredient.count);
    },

    /**
     * Стоимость всех ингредиентов на пицце
     * @returns {number}
     */
    chosenIngredientsPrice() {
      return this.chosenIngredients.reduce(
        (total, ingredient) => total + ingredient.price * ingredient.count,
        0
      );
    },

    /**
     * Итоговая цена пиццы
     * @returns {number}
     */
    price() {
      return (
        (this.chosenDough.price +
          this.chosenSauce.price +
          this.chosenIngredientsPrice) *
        this.chosenSize.multiplier
      );
    },

    /**
     * Можно отправлять в готовку
     * @returns {boolean}
     */
    canCook() {
      return this.pizzaName !== "" && this.chosenIngredients.length > 0;
    },
  },

  methods: {
    selectDough(doughId) {
      this.chosenDoughId = doughId;
    },

    selectSize(sizeId) {
      this.chosenSizeId = sizeId;
    },

    selectSauce(sauceId) {
      this.chosenSauceId = sauceId;
    },

    changeIngredient(ingredient, newCount) {
      ingredient.count = newCount;
    },

    addToCart() {
      console.log("submit");
    },
  },
};
</script>
