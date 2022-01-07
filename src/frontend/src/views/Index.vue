<template>
  <main class="content">
    <form action="#" method="post" @submit.prevent="addToCart">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <BuilderDoughSelector
            :dough="dough"
            :chosenDoughId="chosenDoughId"
            @select="selectDough"
          />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector
            :sizes="sizes"
            :chosenSizeId="chosenSizeId"
            @select="selectSize"
          />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector
            :ingredients="ingredients"
            :sauces="sauces"
            :chosenSauceId="chosenSauceId"
            @selectSauce="selectSauce"
            @changeIngredient="changeIngredient"
          />
        </div>

        <div class="content__pizza">
          <BuilderPizzaName
            :name="pizzaName"
            @changeName="pizzaName = $event"
          />

          <div class="content__constructor">
            <BuilderPizzaView
              :ingredients="ingredients"
              :chosenDough="dough.find((dough) => dough.id === chosenDoughId)"
              :chosenSauce="sauces.find((sauce) => sauce.id === chosenSauceId)"
              @dropIngredient="changeIngredient"
            />
          </div>

          <BuilderPriceCounter
            class="content__result"
            :price="price"
            :canCook="canCook"
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
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
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
     * Итоговая цена пиццы
     * @returns {number}
     */
    price() {
      return (
        (this.dough.find((dough) => dough.id === this.chosenDoughId).price +
          this.sauces.find((sauce) => sauce.id === this.chosenSauceId).price +
          this.ingredients.reduce(
            (total, ingredient) => total + ingredient.price * ingredient.count,
            0
          )) *
        this.sizes.find((size) => size.id === this.chosenSizeId).multiplier
      );
    },

    /**
     * Можно отправлять в готовку
     * @returns {boolean}
     */
    canCook() {
      return (
        this.pizzaName !== "" &&
        this.ingredients.filter((ingredient) => ingredient.count).length > 0
      );
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
