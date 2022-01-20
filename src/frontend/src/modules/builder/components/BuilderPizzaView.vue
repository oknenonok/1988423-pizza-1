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
        v-for="{ id, value } in chosenIngredients"
        :key="id"
        class="pizza__filling"
        :class="`pizza__filling--${value}`"
      >
        <div
          v-if="getIngredientQuantity(id) >= 2"
          class="pizza__filling pizza__filling--second"
          :class="`pizza__filling--${value}`"
        />
        <div
          v-if="getIngredientQuantity(id) >= 3"
          class="pizza__filling pizza__filling--third"
          :class="`pizza__filling--${value}`"
        />
      </div>
    </AppDrop>
  </div>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
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
  },
};
</script>
