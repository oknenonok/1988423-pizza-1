<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${chosenDough.value}-${chosenSauce.value}`"
    @drop="addIngredient"
  >
    <transition-group
      name="pizza"
      class="pizza__wrapper"
      tag="div"
    >
      <div
        v-for="({value, id}) in ingredientClasses"
        :key="id"
        class="pizza__filling-wrapper"
      >
        <div
          class="pizza__filling"
          :class="value"
        />
      </div>
    </transition-group>
  </AppDrop>
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
    ...mapGetters("Builder", ["chosenDough", "chosenSauce", "getIngredientQuantity", "chosenIngredients"]),

    ingredientClasses() {
      let result = [];
      this.chosenIngredients.forEach(({ id, value }) => {
        result.push({
          id: `${id}-1`,
          value: `pizza__filling--${value}`,
        });
        if (this.getIngredientQuantity(id) >= 2) {
          result.push({
            id: `${id}-2`,
            value: `pizza__filling--${value} pizza__filling--second`,
          });
        }
        if (this.getIngredientQuantity(id) >= 3) {
          result.push({
            id: `${id}-3`,
            value: `pizza__filling--${value} pizza__filling--third`,
          });
        }
      });
      return result;
    },
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

<style lang="scss">
.pizza {
  &-enter-active{
    animation: ingredient-appear ease-out $animation-time;
    z-index: 100;
  }

  &-leave-active{
    animation: ingredient-disappear ease-out $animation-time;
    z-index: 100;
  }

  @keyframes ingredient-appear {
    from {
      transform: scale(130%);
    }

    50% {
      transform: scale(80%);
    }

    to {
      transform: scale(100%);
    }
  }

  @keyframes ingredient-disappear {
    from {
      transform: scale(100%);
    }

    50% {
      transform: scale(120%);
    }

    to {
      transform: scale(10%);
    }
  }
}
</style>
