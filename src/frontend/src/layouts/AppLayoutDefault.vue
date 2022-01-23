<template>
  <div>
    <AppLayoutHeader />
    <AppTransitionSlide>
      <router-view />
    </AppTransitionSlide>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader";
import AppTransitionSlide from "@/common/transitions/AppTransitionSlide";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
    AppTransitionSlide,
 },
};
</script>
