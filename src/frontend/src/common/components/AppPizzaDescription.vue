<template>
  <div class="product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="item.name"
    >
    <div class="product__text">
      <h2 data-test="pizzaName">
        {{ item.name }}
      </h2>
      <ul>
        <li data-test="pizzaSize">
          {{ item.size.name }}, {{ item.dough.caption }}
        </li>
        <li data-test="pizzaSauce">
          Соус: {{ item.sauce.name.toLowerCase() }}
        </li>
        <li data-test="pizzaIngredients">
          Начинка:
          {{ ingredientsString }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { LOCALE } from "@/common/constants";

export default {
  name: "AppPizzaDescription",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ingredientsString() {
      return new Intl.ListFormat(LOCALE).format(this.item.ingredients.map((ingredient) =>
        ingredient.name.toLowerCase() + (ingredient.quantity > 1 ? ` (x${ingredient.quantity})` : "")
      ));
    }
  }
};
</script>

<style lang="scss">
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
