<template>
  <div
    v-click-outside="close"
    class="popup"
    tabindex="0"
    @keydown.esc="close"
  >
    <a
      v-if="isOrderSuccess"
      href="#"
      class="close"
      @click.prevent="close"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">
        Спасибо за заказ
      </h2>
    </div>
    <p v-if="isOrderSuccess">
      Мы начали готовить Ваш заказ, скоро привезём его вам ;)
    </p>
    <p v-else-if="isOrderError">
      Что-то пошло не так, попробуйте ещё
    </p>
    <p v-if="isOrderSending">
      Создаём ваш заказ...
    </p>
    <div
      class="popup__button"
    >
      <a
        v-if="!isOrderSending"
        href="#"
        class="button"
        @click.prevent="close"
      >
        <span v-if="isOrderSuccess">
          Отлично, я жду!
        </span>
        <span v-else-if="isOrderError">
          Ладно
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";

export default {
  name: "CartOrderPopup",

  computed: {
    ...mapState("Cart", ["orderCreateStatus"]),

    isOrderError() {
      return this.orderCreateStatus === orderCreateStatuses.EDITING;
    },

    isOrderSending() {
      return this.orderCreateStatus === orderCreateStatuses.SENDING;
    },

    isOrderSuccess() {
      return this.orderCreateStatus === orderCreateStatuses.SUCCESS;
    },
  },

  methods: {
    close() {
      if (!this.isOrderSending) {
        this.$emit("close");
      }
    }
  }
};
</script>
