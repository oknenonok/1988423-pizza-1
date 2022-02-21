<template>
  <router-link to="/" class="logo" data-test="logo">
    <img
      src="@/assets/img/logo.svg"
      alt="V!U!E! Pizza logo"
      width="90"
      height="40"
    />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppLogo extends Vue {}
</script>

<style lang="scss">
.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
