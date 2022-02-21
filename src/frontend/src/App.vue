<template>
  <div id="app">
    <component :is="layout" class="body" />
    <NotificationsList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RESET_STATE } from "@/store/mutations-types";
import { APP_DEFAULT_LAYOUT } from "@/common/constants";
import NotificationsList from "@/modules/notifications/components/NotificationsList.vue";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import setAuthHeader from "@/common/helpers/setAuthHeader";
import AppLayoutDefault from "@/layouts/AppLayoutDefault.vue";
import AppLayoutAccount from "@/layouts/AppLayoutAccount.vue";
import AppLayoutClean from "@/layouts/AppLayoutClean.vue";

@Component({
  components: {
    AppLayoutDefault,
    AppLayoutAccount,
    AppLayoutClean,
    NotificationsList,
  },
})
export default class App extends Vue {
  get layout() {
    return this.$route?.meta?.layout ?? APP_DEFAULT_LAYOUT;
  }

  created() {
    if (this.$store.state.Auth.token) {
      setAuthHeader(this.$store.state.Auth.token);
      this.$store.dispatch("Auth/loadData");
    }
    this.fixCartStatus();
    this.$store.dispatch("Cart/loadDataForCalculation");
  }

  /**
   * Если при загрузке страницы корзина не пребывает в состоянии редактирования, нужно это исправить
   */
  fixCartStatus() {
    if (
      this.$store.state.Cart.orderCreateStatus === orderCreateStatuses.SUCCESS
    ) {
      this.$store.commit(`Cart/${RESET_STATE}`);
    } else if (
      this.$store.state.Cart.orderCreateStatus === orderCreateStatuses.SENDING
    ) {
      this.$store.commit("Cart/setStatus", orderCreateStatuses.EDITING);
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
