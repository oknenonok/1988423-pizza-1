<template>
  <div>
    <AppLayoutHeader />
    <AppTransitionSlide>
      <router-view />
    </AppTransitionSlide>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppLayoutHeader from "@/layouts/components/AppLayoutHeader.vue";
import AppTransitionSlide from "@/common/transitions/AppTransitionSlide.vue";

@Component({
  components: {
    AppLayoutHeader,
    AppTransitionSlide,
  },
})
export default class AppLayoutDefault extends Vue {}
</script>
