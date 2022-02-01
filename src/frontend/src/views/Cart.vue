<template>
  <form
    v-if="dataReady"
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

    <AppPopup :is-open="isOrderPopupOpened">
      <CartOrderPopup @close="hidePopup" />
    </AppPopup>
  </form>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions,
} from "vuex";
import { RESET_STATE } from "@/store/mutations-types";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartAddress from "@/modules/cart/components/CartAddress";
import CartFooter from "@/modules/cart/components/CartFooter";
import CartOrderPopup from "@/modules/cart/components/CartOrderPopup";
import orderCreateStatuses from "@/common/enums/orderCreateStatuses";
import AppPopup from "@/common/components/AppPopup";

export default {
  name: "Cart",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartAddress,
    CartFooter,
    CartOrderPopup,
    AppPopup,
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

  watch: {
    user(newUser, oldUser) {
      if (newUser && !oldUser) {
        this.$store.dispatch("Addresses/load");
      }
    }
  },

  created() {
    this.$store.dispatch("Cart/init");
  },

  methods: {
    ...mapActions("Orders", ["createOrder"]),

    async placeOrder() {
      this.isOrderPopupOpened = true;
      await this.createOrder();
    },

    hidePopup() {
      if (this.orderCreateStatus === orderCreateStatuses.SUCCESS) {
        setTimeout(() => {
          this.$store.commit(`Cart/${RESET_STATE}`);
          this.$router.push(this.user ? "/orders" : "/");
        }, 400);
      }
      this.isOrderPopupOpened = false;
    },
  },
};
</script>
