<template>
  <div>
    <transition
      name="dialog"
      appear
    >
      <div
        v-if="isOpen"
        class="dialog"
      >
        <slot />
      </div>
    </transition>
    <transition
      name="dialog-overlay"
      appear
    >
      <div
        v-if="isOpen"
        class="dialog-overlay"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppPopup",

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>


<style lang="scss">
.dialog-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background: $black;
  opacity: 0.3;

  &-enter {
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: all $animation-time;
  }

  &-leave-to {
    opacity: 0;
  }
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  z-index: 10;
  display: block;

  &-enter {
    top: 0;
  }

  &-enter-active, &-leave-active {
    transition: all $animation-time;
  }

  &-leave-to {
    transform: scale(10%) rotate(180deg);
  }
}
</style>
