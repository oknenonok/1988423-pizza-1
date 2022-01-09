<template>
  <div
    class="sign-form"
    tabindex="0"
    v-click-outside="sendClose"
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
          type="email"
          name="email"
          placeholder="example@mail.ru"
          caption="E-mail"
          ref="inputLogin"
        />
      </div>

      <div class="sign-form__input">
        <AppInput
          type="password"
          name="pass"
          placeholder="***********"
          caption="Пароль"
        />
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",

  props: {
    isPopup: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    tryLogin() {
      //TODO: добавить логику авторизации
      if (this.isPopup) {
        this.sendClose();
      } else {
        this.$router.push(this.$route.query.back ?? "/");
      }
    },

    sendClose() {
      if (this.isPopup) {
        this.$emit("close");
      }
    },
  },

  mounted() {
    this.$nextTick().then(() => {
      this.$refs.inputLogin.$el.querySelector("input").focus();
    });
  },
};
</script>
