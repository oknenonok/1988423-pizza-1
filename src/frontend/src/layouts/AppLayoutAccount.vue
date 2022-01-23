<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <AppLayoutAccountSidebar />
      <AppTransitionSlide>
        <router-view />
      </AppTransitionSlide>
    </main>
  </div>
</template>

<script>
import AppLayoutAccountSidebar from "@/layouts/components/AppLayoutAccountSidebar";
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader";
import AppTransitionSlide from "@/common/transitions/AppTransitionSlide";

export default {
  name: "AppLayoutAccount",

  components: {
    AppLayoutAccountSidebar,
    AppLayoutHeader,
    AppTransitionSlide,
  },
};
</script>
