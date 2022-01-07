<template>
  <div>
    <p>
      Итого:
      {{ priceFormatted }}
    </p>
    <button type="submit" class="button" :disabled="!canCook">Готовьте!</button>
  </div>
</template>

<script>
import { priceFormat } from "@/common/functions";

export default {
  name: "BuilderPriceCounter",

  props: {
    price: {
      type: Number,
      required: true,
    },
    canCook: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    priceFormatted() {
      return priceFormat(this.price);
    },
  },
};
</script>
