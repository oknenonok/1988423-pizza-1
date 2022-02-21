<template>
  <div v-click-outside="close" class="popup" tabindex="0" @keydown.esc="close">
    <a v-if="isOrderSuccess" href="#" class="close" @click.prevent="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p v-if="isOrderSuccess" key="order-success">
      Мы начали готовить Ваш заказ, скоро привезём его вам ;)
    </p>
    <p v-else-if="isOrderError" key="order-error">
      Что-то пошло не так, попробуйте ещё
    </p>
    <p v-else-if="isOrderSending" key="order-sending">Создаём ваш заказ...</p>
    <div class="popup__button">
      <a v-if="!isOrderSending" href="#" class="button" @click.prevent="close">
        <span v-if="isOrderSuccess"> Отлично, я жду! </span>
        <span v-else-if="isOrderError"> Ладно </span>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import ClickOutside from "vue-click-outside";

@Component({
  computed: {
    ...mapState("Cart", ["orderCreateStatus"]),
  },
  directives: { ClickOutside },
})
export default class CartOrderPopup extends Vue {
  orderCreateStatus!: number;

  get isOrderError() {
    return this.orderCreateStatus === orderCreateStatuses.EDITING;
  }

  get isOrderSending() {
    return this.orderCreateStatus === orderCreateStatuses.SENDING;
  }

  get isOrderSuccess() {
    return this.orderCreateStatus === orderCreateStatuses.SUCCESS;
  }

  close() {
    if (!this.isOrderSending) {
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss">
.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
