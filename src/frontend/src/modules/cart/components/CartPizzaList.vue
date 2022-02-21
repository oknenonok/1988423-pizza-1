<template>
  <ul class="cart-list sheet">
    <li v-for="item in cartItems" :key="item.id" class="cart-list__item">
      <AppPizzaDescription class="cart-list__product" :item="item" />

      <AppItemCounter
        class="cart-list__counter"
        :value="item.quantity"
        counter-button-class="counter__button--orange"
        @input="updateQuantity({ item, quantity: $event })"
      />

      <div class="cart-list__price">
        <b>
          {{ $priceFormat(item.price * item.quantity) }}
        </b>
      </div>

      <div class="cart-list__button">
        <router-link :to="`/?edit=${item.id}`" class="cart-list__edit">
          Изменить
        </router-link>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import AppPizzaDescription from "@/common/components/AppPizzaDescription.vue";

@Component({
  components: {
    AppPizzaDescription,
  },

  computed: {
    ...mapState("Cart", ["cartItems"]),
  },

  methods: {
    ...mapActions("Cart", ["updateQuantity"]),
  },
})
export default class CartPizzaList extends Vue {}
</script>

<style lang="scss">
.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  display: flex;
  align-items: flex-start;

  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;

    border-bottom: none;
  }
}

.cart-list__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-list__edit {
  @include l-s11-h13;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  outline: none;
  background-color: transparent;
  color: inherit;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
