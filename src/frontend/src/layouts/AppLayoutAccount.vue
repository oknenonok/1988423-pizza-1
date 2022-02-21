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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppLayoutAccountSidebar from "@/layouts/components/AppLayoutAccountSidebar.vue";
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader.vue";
import AppTransitionSlide from "@/common/transitions/AppTransitionSlide.vue";

@Component({
  components: {
    AppLayoutAccountSidebar,
    AppLayoutHeader,
    AppTransitionSlide,
  },
})
export default class AppLayoutAccount extends Vue {}
</script>
