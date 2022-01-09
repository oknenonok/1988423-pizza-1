<template>
  <AppLayoutDefault>
    <main class="layout">
      <AppLayoutAccountSidebar />
      <slot />
    </main>
  </AppLayoutDefault>
</template>

<script>
import AppLayoutDefault from "@/layouts/AppLayoutDefault";
import AppLayoutAccountSidebar from "@/layouts/components/AppLayoutAccountSidebar";

export default {
  name: "AppLayoutAccount",

  components: {
    AppLayoutDefault,
    AppLayoutAccountSidebar,
  },
};
</script>
