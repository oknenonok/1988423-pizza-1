<template>
  <header class="header">
    <div class="header__logo">
      <AppLogo />
    </div>
    <div class="header__cart">
      <router-link to="/cart">
        {{ $priceFormat(price) }}
      </router-link>
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

    <Login
      v-if="isLoginFormOpened"
      is-popup
      @close="hideLoginForm"
    />
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import { getView } from "@/common/helpers";
import AppLogo from "@/common/components/AppLogo";

export default {
  name: "AppLayoutHeader",

  components: {
    AppLogo,
    Login: getView("Login"),
  },

  data() {
    return {
      isLoginFormOpened: false,
    };
  },

  computed: {
    ...mapGetters("Cart", ["price"]),
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
