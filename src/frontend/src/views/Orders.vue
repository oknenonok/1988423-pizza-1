<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">
        История заказов
      </h1>
    </div>

    <OrderInfo
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderInfo from "@/modules/orders/components/OrderInfo";
import redirectOnLogout from "@/common/mixins/redirectOnLogout";

export default {
  name: "Orders",

  components: {
    OrderInfo,
  },

  mixins: [
    redirectOnLogout
  ],

  computed: {
    ...mapGetters("Orders", ["dataReady", "orders"]),
  },

  created() {
    this.$store.dispatch("Orders/init");
  },
};
</script>
