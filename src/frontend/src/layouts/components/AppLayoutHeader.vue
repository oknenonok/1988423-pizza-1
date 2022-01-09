<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">0 ₽</router-link>
    </div>
    <div class="header__user">
      <a
        :href="`/login?back=${$route.path}`"
        class="header__login"
        @click.prevent.stop="showLoginForm"
      >
        <span>Войти</span>
      </a>
    </div>

    <Login v-if="isLoginFormOpened" isPopup @close="hideLoginForm" />
  </header>
</template>

<script>
export default {
  name: "AppLayoutHeader",

  components: { Login: () => import("@/views/Login.vue") },

  data() {
    return {
      isLoginFormOpened: false,
    };
  },

  methods: {
    showLoginForm() {
      this.isLoginFormOpened = true;
    },

    hideLoginForm() {
      this.isLoginFormOpened = false;
    },
  },
};
</script>
