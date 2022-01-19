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
          <span
            v-for="(ingredient, index) in item.ingredients"
            :key="ingredient.id"
          >
            {{ ingredient.name.toLowerCase() }}<!--
                --><span v-if="ingredient.quantity > 1"> (x{{ ingredient.quantity }})</span><!--
                --><span v-if="index < item.ingredients.length - 1">,</span>
          </span>
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
};
</script>