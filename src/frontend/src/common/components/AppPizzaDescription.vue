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
      <h2>
        {{ item.name }}
      </h2>
      <ul>
        <li>{{ item.size.name }}, {{ item.dough.caption }}</li>
        <li>Соус: {{ item.sauce.name.toLowerCase() }}</li>
        <li>
          Начинка:
          {{ ingredientsString }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      return this.item.ingredients.map((ingredient) =>
        ingredient.name.toLowerCase() + (ingredient.quantity > 1 ? ` (x${ingredient.quantity})` : "")
      ).join(", ");
    }
  }
};
</script>
