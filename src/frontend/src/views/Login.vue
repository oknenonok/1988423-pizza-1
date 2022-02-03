<template>
  <div
    v-click-outside="sendClose"
    class="sign-form"
    tabindex="0"
    @keydown.esc="sendClose"
  >
    <a
      v-if="isPopup"
      class="close close--white"
      @click="sendClose"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">
        Авторизуйтесь на сайте
      </h1>
    </div>
    <form
      action="#"
      method="post"
      @submit.prevent="tryLogin"
    >
      <div class="sign-form__input">
        <AppInput
          v-model="email"
          v-autofocus
          type="email"
          name="email"
          placeholder="example@mail.ru"
          caption="E-mail"
          required
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="password"
          placeholder="***********"
          caption="Пароль"
          required
        />
      </div>
      <button
        type="submit"
        class="button"
      >
        Авторизоваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { isLoggedIn } from "@/middlewares";

export default {
  name: "Login",
  title: "Вход",
  layout: "AppLayoutClean",
  middlewares: [isLoggedIn],

  props: {
    isPopup: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions("Auth", ["login"]),

    async tryLogin() {
      let token = await this.login({
        email: this.email,
        password: this.password,
      });
      if (token) {
        if (this.isPopup) {
          this.sendClose();
        } else {
          this.$router.push(this.$route.query.back ?? "/");
        }
      }
    },

    sendClose() {
      if (this.isPopup) {
        this.$emit("close");
      }
    },
  },
};
</script>
