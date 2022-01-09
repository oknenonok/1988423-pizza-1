<template>
  <div
    class="pizza"
    :class="`pizza--foundation--${chosenDough.value}-${chosenSauce.value}`"
  >
    <AppDrop class="pizza__wrapper" @drop="addIngredient">
      <div
        v-for="ingredient in chosenIngredients"
        :key="ingredient.id"
        class="pizza__filling"
        :class="fillingClass(ingredient)"
      ></div>
    </AppDrop>
  </div>
</template>

<script>
import {
  MAX_INGREDIENT_COUNT,
  MAPPING_FILLING_CLASS,
} from "@/common/constants";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",

  components: { AppDrop },

  props: {
    ingredients: {
      type: Array,
      required: true,
    },

    chosenDough: {
      type: Object,
      required: true,
    },

    chosenSauce: {
      type: Object,
      required: true,
    },

    chosenIngredients: {
      type: Array,
      required: true,
    },
  },

  methods: {
    /**
     * Добавить 1 единицу ингредиента
     * @param {number} id ингредиента
     */
    addIngredient(ingredientId) {
      let ingredient = this.ingredients.find(
        (ingredient) => ingredient.id === ingredientId
      );
      if (ingredient && ingredient.count < MAX_INGREDIENT_COUNT) {
        this.$emit("dropIngredient", ingredient, ingredient.count + 1);
      }
    },

    /**
     * css-класс для отображения ингредиента
     * @param {object} ingredient
     * @returns {string}
     */
    fillingClass(ingredient) {
      return (
        `pizza__filling--${ingredient.value} ` +
        MAPPING_FILLING_CLASS[ingredient.count]
      );
    },
  },
};
</script>
