<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <div v-if="ordersLoaded">
      <OrderInfo v-for="order in orders" :key="order.id" :order="order" />
    </div>
    <p v-else>Заказы загружаются...</p>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { mapGetters, mapState } from "vuex";
import OrderInfo from "@/modules/orders/components/OrderInfo.vue";
import RedirectOnLogout from "@/common/mixins/redirectOnLogout";
import { auth } from "@/middlewares";

@Component({
  components: {
    OrderInfo,
  },

  computed: {
    ...mapState("Orders", ["ordersLoaded"]),
    ...mapGetters("Orders", ["dataReady", "orders"]),
  },
})
export default class PageOrders extends mixins(RedirectOnLogout) {
  title = "История заказов";

  layout = "AppLayoutAccount";
  middlewares = [auth];

  created() {
    this.$store.dispatch("Orders/init");
  }
}
</script>
