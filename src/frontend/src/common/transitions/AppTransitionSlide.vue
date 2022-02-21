<template>
  <transition name="slide" mode="out-in" appear>
    <slot />
  </transition>
</template>

<style lang="scss">
.slide-enter-active {
  transition: all $animation-time;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all $animation-time;
  opacity: 0;
  margin-left: -100px;
}
</style>
