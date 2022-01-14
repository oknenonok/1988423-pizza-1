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
  MAX_INGREDIENT_QUANTITY,
  MAPPING_FILLING_CLASS,
} from "@/common/constants";
import {
  mapGetters,
  mapMutations,
} from "vuex";
import { SET_INGREDIENT_QUANTITY } from "@/store/mutations-types";
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",

  components: { AppDrop },

  computed: {
    ...mapGetters("Builder", ["chosenDough", "chosenSauce", "getIngredientQuantity", "chosenIngredients"])
  },

  methods: {
    ...mapMutations("Builder", {
      setIngredientQuantity: SET_INGREDIENT_QUANTITY,
    }),

    /**
     * Добавить 1 единицу ингредиента
     * @param {number} id ингредиента
     */
    addIngredient(ingredientId) {
      let quantity = this.getIngredientQuantity(ingredientId)
      if (ingredientId && quantity < MAX_INGREDIENT_QUANTITY) {
        this.setIngredientQuantity({ingredientId, quantity: quantity + 1});
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
        MAPPING_FILLING_CLASS[this.getIngredientQuantity(ingredient.id)]
      );
    },
  },
};
</script>
