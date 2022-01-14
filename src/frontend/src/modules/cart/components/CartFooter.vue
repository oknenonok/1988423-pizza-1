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
      <button
        type="submit"
        class="button"
        :disabled="!canMakeOrder"
      >
        Оформить заказ
      </button>
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
