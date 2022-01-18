<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import setAuthHeader from "@/common/helpers/setAuthHeader";
import fixCartStatus from "@/common/helpers/fixCartStatus";
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
    fixCartStatus(this.$store);
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
