<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите ингредиенты
    </h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <AppRadioButton
          v-for="sauce in sauces"
          :key="sauce.id"
          class="radio ingredients__input"
          name="sauce"
          :value="sauce.id"
          :checked="chosenSauceId === sauce.id"
          @select="setSauce"
        >
          <span>{{ sauce.name }}</span>
        </AppRadioButton>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            class="ingredients__item"
          >
            <AppDrag
              :transfer-data="ingredient.id"
              :draggable="getIngredientQuantity(ingredient.id) < maxQuantity"
              class="filling"
              :class="`filling--${ingredient.value}`"
            >
              {{ ingredient.name }}
            </AppDrag>

            <AppItemCounter
              class="counter--orange ingredients__counter"
              :value="getIngredientQuantity(ingredient.id)"
              :max-value="maxQuantity"
              @input="setIngredientQuantity({ingredientId: ingredient.id, quantity: $event})"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
} from "vuex";
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import {
  SET_INGREDIENT_QUANTITY,
  SET_SAUCE,
} from "@/store/mutations-types";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppDrag,
  },

  data() {
    return {
      maxQuantity: MAX_INGREDIENT_QUANTITY,
    };
  },

  computed: {
    ...mapState("Builder", ["chosenSauceId"]),
    ...mapGetters(["ingredients", "sauces"]),
    ...mapGetters("Builder", ["getIngredientQuantity"])
  },

  methods: {
    ...mapMutations("Builder", {
      setSauce: SET_SAUCE,
      setIngredientQuantity: SET_INGREDIENT_QUANTITY,
    }),
  },
};
</script>
