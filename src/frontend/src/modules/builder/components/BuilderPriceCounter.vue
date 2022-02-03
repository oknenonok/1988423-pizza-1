<template>
  <div>
    <p data-test="finalPrice">
      Итого:
      {{ $priceFormat(price) }}
    </p>
    <AppButton
      type="submit"
      :disabled="!canCook"
      caption="Готовьте!"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
} from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState("Builder", ["pizzaName"]),
    ...mapGetters("Builder", ["chosenIngredients", "price"]),

    /**
     * Можно отправлять в готовку
     * @returns {boolean}
     */
    canCook() {
      return this.pizzaName !== "" && this.chosenIngredients.length > 0;
    },
  },
};
</script>
