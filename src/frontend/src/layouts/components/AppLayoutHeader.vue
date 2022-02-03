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

<style lang="scss">
.header {
  position: relative;
  z-index: 2;

  display: flex;

  padding: 0 2.12%;

  background-color: $green-500;
  box-shadow: $shadow-light;
}

.header__logo {
  padding-top: 10px;
  padding-bottom: 10px;
}

.header__cart {
  margin-right: 10px;
  margin-left: auto;

  a {
    @include b-s16-h19;

    display: block;

    padding-top: 21px;
    padding-right: 15px;
    padding-bottom: 21px;
    padding-left: 58px;

    transition: 0.3s;

    color: $white;
    background-color: $green-500;
    background-image: url("~@/assets/img/cart.svg");
    background-repeat: no-repeat;
    background-position: 20px center;
    background-size: 29px 27px;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }
}

.header__user {
  display: flex;
  align-items: center;

  a {
    display: block;

    padding-top: 14px;
    padding-right: 20px;
    padding-bottom: 14px;
    padding-left: 20px;

    transition: 0.3s;

    background-color: $green-500;

    &:hover:not(:active) {
      background-color: $green-400;
    }

    &:active {
      background-color: $green-600;
    }

    &:focus {
      opacity: 0.5;
    }
  }

  img {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }

  span {
    @include r-s14-h16;

    display: inline-block;

    vertical-align: middle;

    color: $white;
  }
}

.header__logout {
  &::before {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-right: 8px;

    content: '';
    vertical-align: middle;

    background: url("~@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}


.header__login {
  &::after {
    display: inline-block;

    width: 32px;
    height: 32px;
    margin-left: 8px;

    content: '';
    vertical-align: middle;

    background: url("~@/assets/img/login.svg") no-repeat center;
    background-size: auto 50%;
  }
}
</style>
