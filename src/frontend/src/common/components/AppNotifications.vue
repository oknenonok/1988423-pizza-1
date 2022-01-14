<template>
  <div
    v-if="notifications.length"
    class="notification__wrapper"
  >
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Notifications",
  computed: {
    ...mapState(["notifications"])
  }
};
</script>

<style lang="scss" scoped>
.notification {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  text-align: center;
  color: $white;
  border-bottom: 2px solid transparent;
  &__wrapper {
    position: fixed;
    z-index: 9999;
    bottom: 20px;
    right: 0;
    width: 420px;
    padding: 10px;
  }
  &--info {
    border-color: $silver-300;
    background: $silver-100;
  }
  &--error {
    border-color: $red-900;
    background: $red-800;
  }
  &--success {
    border-color: $green-600;
    background: $green-300;
  }
  &--warning {
    border-color: $orange-300;
    background: $orange-100;
  }
}
</style>
