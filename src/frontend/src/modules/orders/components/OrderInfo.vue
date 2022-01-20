<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ $priceFormat(order.price) }}</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="remove(order)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button
          type="button"
          class="button"
          @click="repeat"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <AppPizzaDescription
          :item="pizza"
        />

        <p class="order__price">
          <span v-if="pizza.quantity > 1">{{ pizza.quantity }} x</span>
          {{ $priceFormat(pizza.price) }}
        </p>
      </li>
    </ul>

    <ul
      v-if="order.orderMisc.length"
      class="order__additional"
    >
      <li
        v-for="{id, image, name, price, quantity} in order.orderMisc"
        :key="id"
      >
        <img
          :src="image"
          width="20"
          height="30"
          :alt="name"
        >
        <p>
          <span>{{ name }}</span>
          <b>
            <span v-if="quantity > 1">{{ quantity }} x</span>
            {{ $priceFormat(price) }}
          </b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      {{ addressString }}
    </p>
  </section>
</template>

<script>
import {
  mapActions,
  mapMutations,
} from "vuex";
import AppPizzaDescription from "@/common/components/AppPizzaDescription";
import { RESET_STATE_TO_ORDER } from "@/store/mutations-types";

export default {
  name: "OrderInfo",

  components: {
    AppPizzaDescription,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    addressString() {
      return this.order.orderAddress
        ? "Адрес доставки: " + this.order.orderAddress.street
          + (this.order.orderAddress.building ? `, д. ${this.order.orderAddress.building}` : "")
          + (this.order.orderAddress.flat ? `, кв. ${this.order.orderAddress.flat}` : "")
        : "Самовывоз";
    },
  },

  methods: {
    ...mapActions("Orders", ["remove"]),
    ...mapMutations("Cart", {
      repeatOrder: RESET_STATE_TO_ORDER,
    }),

    repeat() {
      this.repeatOrder(this.order);
      this.$router.push("/cart");
    }
  }
};
</script>
