<template>
  <form
    v-if="dataReady"
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="placeOrder"
  >
    <main class="content cart">
      <div
        v-if="!isCartEmpty"
        class="container"
      >
        <div class="cart__title">
          <h1 class="title title--big">
            Корзина
          </h1>
        </div>

        <CartPizzaList />

        <div class="cart__additional">
          <CartAdditionalList />
        </div>

        <div class="cart__form">
          <CartAddress />
        </div>
      </div>

      <div
        v-else
        class="sheet cart__empty"
      >
        <p>В корзине нет ни одного товара</p>
      </div>
    </main>

    <CartFooter />

    <CartOrderPopup
      v-if="isOrderPopupOpened"
      @close="hidePopup"
    />
  </form>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions,
} from "vuex";
import {
  RESET_STATE,
  SET_ENTITY,
} from "@/store/mutations-types";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartAddress from "@/modules/cart/components/CartAddress";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartOrderPopup from "@/modules/cart/components/CartOrderPopup";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";

export default {
  name: "Cart",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartAddress,
    CartFooter,
    CartOrderPopup,
  },

  data() {
    return {
      isOrderPopupOpened: false,
    };
  },

  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Cart", ["orderCreateStatus"]),
    ...mapGetters("Cart", ["dataReady", "price", "isCartEmpty"]),
  },

  created() {
    this.$store.dispatch("Cart/init");
    if (this.orderCreateStatus === orderCreateStatuses.SUCCESS) {
      this.$store.commit(`Cart/${RESET_STATE}`);
    } else if (this.orderCreateStatus === orderCreateStatuses.SENDING) {
      this.$store.commit(SET_ENTITY, {
        module: "Cart",
        entity: "orderCreateStatus",
        value: orderCreateStatuses.EDITING,
      }, { root: true });
    }
  },

  methods: {
    ...mapActions("Orders", ["createOrder"]),

    async placeOrder() {
      this.isOrderPopupOpened = true;
      await this.createOrder();
    },

    hidePopup() {
      if (this.orderCreateStatus === orderCreateStatuses.SUCCESS) {
        this.$store.commit(`Cart/${RESET_STATE}`);
        this.$router.push(this.user ? "/orders" : "/");
      }
      this.isOrderPopupOpened = false;
    },
  }
};
</script>
