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
        :class="`pizza__filling--${ingredient.value}${
          ingredient.count === 2 ? ' pizza__filling--second' : ''
        }${ingredient.count === 3 ? ' pizza__filling--third' : ''}`"
      ></div>
    </AppDrop>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT } from "@/common/constants";
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
  },

  computed: {
    chosenIngredients() {
      return this.ingredients.filter((ingredient) => ingredient.count);
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
  },
};
</script>
