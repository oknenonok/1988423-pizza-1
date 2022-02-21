<template>
  <div
    v-click-outside="sendClose"
    class="sign-form"
    tabindex="0"
    @keydown.esc="sendClose"
  >
    <a v-if="isPopup" class="close close--white" @click="sendClose">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="#" method="post" @submit.prevent="tryLogin">
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
      <AppButton type="submit" caption="Авторизоваться" />
    </form>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapActions } from "vuex";
import { isLoggedIn } from "@/middlewares";
import { IAuthCredentials } from "@/common/types";
import ClickOutside from "vue-click-outside";

@Component({
  methods: {
    ...mapActions("Auth", ["login"]),
  },
  directives: { ClickOutside },
})
export default class PageLogin extends Vue {
  @Prop({ default: false }) readonly isPopup!: boolean;

  title = "Вход";
  layout = "AppLayoutClean";
  middlewares = [isLoggedIn];

  email = "";
  password = "";
  login!: (payload: IAuthCredentials) => string;

  async tryLogin() {
    let token = await this.login({
      email: this.email,
      password: this.password,
    });
    if (token) {
      if (this.isPopup) {
        this.sendClose();
      } else {
        let path = this.$route.query.back ? `${this.$route.query.back}` : "/";
        if (path) {
          this.$router.push(path);
        }
      }
    }
  }

  sendClose() {
    if (this.isPopup) {
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss">
.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}

.sign-form__title {
  margin-bottom: 24px;

  text-align: center;
}

.sign-form__input {
  margin-bottom: 16px;
}
</style>
