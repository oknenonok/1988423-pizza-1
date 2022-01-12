<template>
  <div
    class="pizza"
    :class="`pizza--foundation--${chosenDough.value}-${chosenSauce.value}`"
  >
    <AppDrop
      class="pizza__wrapper"
      @drop="addIngredient"
    >
      <div
        v-for="ingredient in chosenIngredients"
        :key="ingredient.id"
        class="pizza__filling"
        :class="fillingClass(ingredient)"
      />
    </AppDrop>
  </div>
</template>

<script>
import {
  MAX_INGREDIENT_COUNT,
  MAPPING_FILLING_CLASS,
} from "@/common/constants";
import {
  mapGetters,
  mapMutations,
} from "vuex";
import { SET_INGREDIENT_COUNT } from "@/store/mutations-types";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",

  components: { AppDrop },

  computed: {
    ...mapGetters("Builder", ["chosenDough", "chosenSauce", "getIngredientCount", "chosenIngredients"])
  },

  methods: {
    ...mapMutations("Builder", {
      setIngredientCount: SET_INGREDIENT_COUNT,
    }),

    /**
     * Добавить 1 единицу ингредиента
     * @param {number} id ингредиента
     */
    addIngredient(ingredientId) {
      let count = this.getIngredientCount(ingredientId)
      if (ingredientId && count < MAX_INGREDIENT_COUNT) {
        this.setIngredientCount({ingredientId, count: count + 1});
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
        MAPPING_FILLING_CLASS[this.getIngredientCount(ingredient.id)]
      );
    },
  },
};
</script>
