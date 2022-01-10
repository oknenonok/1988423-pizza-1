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
