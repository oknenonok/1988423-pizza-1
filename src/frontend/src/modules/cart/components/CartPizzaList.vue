<template>
  <ul class="cart-list sheet">
    <li
      v-for="item in cartItems"
      :key="item.id"
      class="cart-list__item"
    >
      <AppPizzaDescription
        class="cart-list__product"
        :item="item"
      />

      <AppItemCounter
        class="cart-list__counter"
        :value="item.quantity"
        counter-button-class="counter__button--orange"
        @input="updateQuantity({item, quantity: $event})"
      />

      <div class="cart-list__price">
        <b>
          {{ $priceFormat(item.price * item.quantity) }}
        </b>
      </div>

      <div class="cart-list__button">
        <router-link
          :to="`/?edit=${item.id}`"
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
import AppPizzaDescription from "@/common/components/AppPizzaDescription";

export default {
  name: "CartPizzaList",

  components: {
    AppPizzaDescription,
  },

  computed: {
    ...mapState("Cart", ["cartItems"]),
  },

  methods: {
    ...mapActions("Cart", ["updateQuantity"]),
  },
};
</script>
