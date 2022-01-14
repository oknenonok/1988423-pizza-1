<template>
  <div>
    <AppLayoutHeader />
    <slot />
    <AppNotifications />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
    AppNotifications,
 },
};
</script>
