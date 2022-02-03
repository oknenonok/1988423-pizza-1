<template>
  <div class="layout__sidebar sidebar">
    <AppLogo class="layout__logo" />

    <router-link
      v-for="{ link, title } in $options.menu"
      :key="link"
      :to="link"
      class="layout__link"
      active-class="layout__link--active"
    >
      {{ title }}
    </router-link>
  </div>
</template>

<script>
import AppLogo from "@/common/components/AppLogo";

export default {
  name: "AppLayoutAccountSidebar",

  components: { AppLogo },

  menu: [
    {
      link: "/orders",
      title: "История заказов",
    },
    {
      link: "/profile",
      title: "Мои данные",
    },
  ],
};
</script>

<style lang="scss">
.sidebar {
  flex-grow: 1;

  background-color: rgba($green-500, 0.05);
}

.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;

  width: 180px;
  height: 100%;

  background-color: rgba($green-500, 0.05);

  animation: slide-sidebar ease-out $animation-time;
}

@keyframes slide-sidebar {
  from {
    top: 20vh;
    opacity: 0;
  }

  to {
    top: 0;
    opacity: 1;
  }
}

.layout__logo {
  display: block;

  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 10px;

  img {
    display: block;
    visibility: hidden;

    margin: 0 auto;
  }
}

.layout__link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}
</style>
