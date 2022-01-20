<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import {
  RESET_STATE,
  SET_ENTITY,
} from "@/store/mutations-types";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import setAuthHeader from "@/common/helpers/setAuthHeader";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: {
    AppLayout,
  },

  created() {
    if (this.$store.state.Auth.token) {
      setAuthHeader(this.$store);
      this.$store.dispatch("Auth/loadData");
    }
    this.fixCartStatus();
  },

  methods: {
    /**
     * Если при загрузке страницы корзина не пребывает в состоянии редактирования, нужно это исправить
     */
    fixCartStatus() {
      if (this.$store.state.Cart.orderCreateStatus === orderCreateStatuses.SUCCESS) {
        this.$store.commit(`Cart/${RESET_STATE}`);
      } else if (this.$store.state.Cart === orderCreateStatuses.SENDING) {
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
