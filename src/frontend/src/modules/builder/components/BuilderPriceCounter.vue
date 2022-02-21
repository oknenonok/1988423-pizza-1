<template>
  <div>
    <p data-test="finalPrice">
      Итого:
      {{ $priceFormat(price) }}
    </p>
    <AppButton type="submit" :disabled="!canCook" caption="Готовьте!" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";
import { IIngredient } from "@/common/types";

@Component({
  computed: {
    ...mapState("Builder", ["pizzaName"]),
    ...mapGetters("Builder", ["chosenIngredients", "price"]),
  },
})
export default class BuilderPriceCounter extends Vue {
  pizzaName!: string;
  chosenIngredients!: IIngredient[];
  price!: number;

  /**
   * Можно отправлять в готовку
   * @returns {boolean}
   */
  get canCook(): boolean {
    return this.pizzaName !== "" && this.chosenIngredients.length > 0;
  }
}
</script>
