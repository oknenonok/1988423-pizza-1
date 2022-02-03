<template>
  <transition-group
    name="notifications"
    class="notification__wrapper"
    tag="ul"
  >
    <li
      v-for="{ text, type, id } in notifications"
      :key="id"
      :class="`notification notification--${type}`"
      @click="deleteNotification(id)"
    >
      <span>{{ text }}</span>
    </li>
  </transition-group>
</template>

<script>
import {
  mapState,
  mapMutations,
} from "vuex";
import { DELETE_NOTIFICATION } from "@/store/mutations-types";

export default {
  name: "NotificationsList",
  computed: {
    ...mapState("Notifications", ["notifications"])
  },

  methods: {
    ...mapMutations("Notifications", {
      deleteNotification: DELETE_NOTIFICATION,
    }),
  },
};
</script>

<style lang="scss">
.notification {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  margin-top: 10px;
  text-align: center;
  color: $white;
  border-bottom: 2px solid transparent;
  border-radius: 5px;
  opacity: 0.8;
  &__wrapper {
    position: fixed;
    z-index: 9999;
    bottom: 10px;
    right: 10px;
    width: 360px;
    list-style: none;
    margin: 0;
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

.notifications {
  &-enter {
    transform: translateX(360px);
    opacity: 0;
  }

  &-enter-active, &-leave-active {
    transition: all $animation-time;
  }

  &-leave-to {
    transform: translateY(100px) rotate(30deg);
    opacity: 0;
  }
}
</style>
