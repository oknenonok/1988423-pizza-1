<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>

    <div v-if="ordersLoaded">
      <OrderInfo
        v-for="order in orders"
        :key="order.id"
        :order="order"
      />
    </div>
    <p v-else>
      Заказы загружаются...
    </p>
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
} from "vuex";
import OrderInfo from "@/modules/orders/components/OrderInfo";
import redirectOnLogout from "@/common/mixins/redirectOnLogout";
import { auth } from "@/middlewares";

export default {
  name: "PageOrders",
  title: "История заказов",

  components: {
    OrderInfo,
  },

  mixins: [
    redirectOnLogout,
  ],

  layout: "AppLayoutAccount",
  middlewares: [auth],

  computed: {
    ...mapState("Orders", ["ordersLoaded"]),
    ...mapGetters("Orders", ["dataReady", "orders"]),
  },

  created() {
    this.$store.dispatch("Orders/init");
  },
};
</script>
