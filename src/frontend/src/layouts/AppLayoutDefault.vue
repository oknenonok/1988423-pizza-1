<template>
  <div>
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader";

export default {
  name: "AppLayoutDefault",

  components: { AppLayoutHeader },
};
</script>
