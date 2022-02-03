<template>
  <section class="footer">
    <div class="footer__more">
      <router-link
        to="/"
        class="button button--border button--arrow"
      >
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br>чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ $priceFormat(price) }}</b>
    </div>

    <div class="footer__submit">
      <AppButton
        type="submit"
        :disabled="!canMakeOrder"
        caption="Оформить заказ"
      />
    </div>
  </section>
</template>

<script>
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import {
  mapState,
  mapGetters,
} from "vuex";

export default {
  name: "CartFooter",

  computed: {
    ...mapState("Cart", ["orderCreateStatus"]),
    ...mapGetters("Cart", ["price", "isCartEmpty"]),

    canMakeOrder() {
      return !this.isCartEmpty && this.orderCreateStatus === orderCreateStatuses.EDITING;
    }
  },
};
</script>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
