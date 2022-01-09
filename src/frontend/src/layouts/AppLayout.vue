<template>
  <component :is="layout" class="body">
    <slot />
  </component>
</template>

<script>
import { APP_DEFAULT_LAYOUT } from "@/common/constants";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta.layout ?? APP_DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
