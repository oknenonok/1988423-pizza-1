<template>
  <div id="app">
    <component
      :is="layout"
      class="body"
    />
    <AppNotifications />
  </div>
</template>

<script>
import {
  RESET_STATE,
  SET_ENTITY,
} from "@/store/mutations-types";
import { APP_DEFAULT_LAYOUT } from "@/common/constants";
import AppNotifications from "@/common/components/AppNotifications";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import setAuthHeader from "@/common/helpers/setAuthHeader";
import AppLayoutDefault from "@/layouts/AppLayoutDefault";
import AppLayoutAccount from "@/layouts/AppLayoutAccount";
import AppLayoutClean from "@/layouts/AppLayoutClean";

export default {
  name: "App",
  components: {
    AppLayoutDefault,
    AppLayoutAccount,
    AppLayoutClean,
    AppNotifications,
  },

  computed: {
    layout() {
      return this?.$route?.meta?.layout ?? APP_DEFAULT_LAYOUT;
    },
  },

  created() {
    if (this?.$store?.state?.Auth?.token) {
      setAuthHeader(this.$store);
      this.$store.dispatch("Auth/loadData");
    }
    this.fixCartStatus();
    this.$store.dispatch("Cart/loadDataForCalculation");
  },

  methods: {
    /**
     * Если при загрузке страницы корзина не пребывает в состоянии редактирования, нужно это исправить
     */
    fixCartStatus() {
      if (this.$store.state.Cart.orderCreateStatus === orderCreateStatuses.SUCCESS) {
        this.$store.commit(`Cart/${RESET_STATE}`);
      } else if (this.$store.state.Cart.orderCreateStatus === orderCreateStatuses.SENDING) {
        this.$store.commit(SET_ENTITY, {
          module: "Cart",
          entity: "orderCreateStatus",
          value: orderCreateStatuses.EDITING,
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
