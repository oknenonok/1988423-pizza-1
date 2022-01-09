<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      v-for="menuItem in menu"
      :key="menuItem.link"
      :to="menuItem.link"
      class="layout__link"
      active-class="layout__link--active"
    >
      {{ menuItem.title }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppLayoutAccountSidebar",

  data() {
    return {
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
  },
};
</script>
