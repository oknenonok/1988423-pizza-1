<template>
  <div>
    <p>
      Итого:
      {{ $priceFormat(price) }}
    </p>
    <button
      type="submit"
      class="button"
      :disabled="!canCook"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
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
};
</script>
