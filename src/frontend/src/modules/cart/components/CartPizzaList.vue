<template>
  <ul class="cart-list sheet">
    <li
      v-for="item in cartItems"
      :key="item.id"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
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

      <AppItemCounter
        class="cart-list__counter"
        :value="item.quantity"
        counter-button-class="counter__button--orange"
        @change="updateQuantity({item, quantity: $event})"
      />

      <div class="cart-list__price">
        <b>
          {{ $priceFormat(item.price * item.quantity) }}
        </b>
      </div>

      <div class="cart-list__button">
        <router-link
          :to="`/?edit=${item.id}`"
          tag="span"
          class="cart-list__edit"
        >
          Изменить
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script>
import {
  mapState,
  mapActions,
} from "vuex";

export default {
  name: "CartPizzaList",

  computed: {
    ...mapState("Cart", ["cartItems"]),
  },

  methods: {
    ...mapActions("Cart", ["updateQuantity"]),
  },
};
</script>
