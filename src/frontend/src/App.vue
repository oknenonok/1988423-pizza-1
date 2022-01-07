<template>
  <div id="app">
    <AppLayout>
      <Index />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import Index from "@/views/Index";

export default {
  name: "App",
  components: {
    AppLayout,
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
