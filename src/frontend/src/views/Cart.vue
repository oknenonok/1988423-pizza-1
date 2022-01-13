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
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import CartPizzaList from "@/modules/cart/components/CartPizzaList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartAddress from "@/modules/cart/components/CartAddress";
import CartFooter from "@/modules/cart/components/CartFooter";

export default {
  name: "Cart",

  components: {
    CartPizzaList,
    CartAdditionalList,
    CartAddress,
    CartFooter,
  },

  computed: {
    ...mapGetters("Cart", ["dataReady", "price", "isCartEmpty"]),
  },

  created() {
    this.$store.dispatch("init");
  },

  methods: {
    placeOrder() {
      console.log("order");
    }
  }
};
</script>
