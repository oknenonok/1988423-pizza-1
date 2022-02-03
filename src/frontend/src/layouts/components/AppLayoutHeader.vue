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

    <div
      v-if="user"
      key="user-auth"
      class="header__user"
    >
      <router-link to="/profile">
        <picture>
          <img
            :src="user.avatar"
            :alt="user.name"
            width="32"
            height="32"
          >
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a
        href="#"
        class="header__logout"
        @click.prevent="logout"
      >
        <span>Выйти</span>
      </a>
    </div>
    <div
      v-else
      key="user-anonym"
      class="header__user"
    >
      <a
        :href="`/login?back=${$route.path}`"
        class="header__login"
        @click.prevent.stop="showLoginForm"
      >
        <span>Войти</span>
      </a>
    </div>

    <AppPopup :is-open="isLoginFormOpened">
      <Login
        is-popup
        @close="hideLoginForm"
      />
    </AppPopup>
  </header>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
} from "vuex";
import getView from "@/common/helpers/getView";
import AppLogo from "@/common/components/AppLogo";
import AppPopup from "@/common/components/AppPopup";

export default {
  name: "AppLayoutHeader",

  components: {
    AppLogo,
    AppPopup,
    Login: getView("Login"),
  },

  data() {
    return {
      isLoginFormOpened: false,
    };
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Cart", ["price"]),
  },

  methods: {
    ...mapActions("Auth", ["logout"]),

    showLoginForm() {
      this.isLoginFormOpened = true;
    },

    hideLoginForm() {
      this.isLoginFormOpened = false;
    },
  },
};
</script>
