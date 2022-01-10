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
          @select="$emit('selectSauce', +$event)"
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
              :draggable="ingredient.count < maxCount"
              class="filling"
              :class="`filling--${ingredient.value}`"
            >
              {{ ingredient.name }}
            </AppDrag>

            <AppItemCounter
              class="counter--orange ingredients__counter"
              :value="ingredient.count"
              :max-value="maxCount"
              @change="$emit('changeIngredient', ingredient, $event)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT } from "@/common/constants";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    AppDrag,
  },

  props: {
    ingredients: {
      type: Array,
      required: true,
    },

    sauces: {
      type: Array,
      required: true,
    },

    chosenSauceId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      maxCount: MAX_INGREDIENT_COUNT,
    };
  },
};
</script>
