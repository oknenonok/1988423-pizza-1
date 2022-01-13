<template>
  <main class="content">
    <form
      v-if="dataReady"
      action="#"
      method="post"
      @submit.prevent="submit"
    >
      <div class="content__wrapper">
        <h1 class="title title--big">
          Конструктор пиццы
        </h1>

        <div class="content__dough">
          <BuilderDoughSelector />
        </div>

        <div class="content__diameter">
          <BuilderSizeSelector />
        </div>

        <div class="content__ingredients">
          <BuilderIngredientsSelector />
        </div>

        <div class="content__pizza">
          <BuilderPizzaName />

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <BuilderPriceCounter class="content__result" />
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from "vuex";
import {
  RESET_STATE,
  RESET_STATE_TO_CART_ITEM,
} from "@/store/mutations-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName";

export default {
  name: "Index",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
  },

  computed: {
    ...mapState("Builder", ["pizzaName", "editCartItemId"]),
    ...mapGetters("Builder", ["dataReady", "chosenDough", "chosenSize", "chosenSauce", "chosenIngredients"]),
  },

  created() {
    this.$store.dispatch("init");
    let cartItemId = +this.$route.query.edit;
    if (cartItemId) {
      let cartItem = this.$store.state.Cart.cartItems.find(item => item.id === cartItemId);
      this.$store.commit(`Builder/${RESET_STATE_TO_CART_ITEM}`, cartItem);
    }
  },

  beforeDestroy() {
    if (this.editCartItemId) {
      this.resetBuilder();
    }
  },

  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_STATE,
    }),
    ...mapActions("Cart", ["addToCart"]),

    submit() {
      if (this.editCartItemId) {
        this.$router.push("/cart");
      } else {
        this.addToCart({
          name: this.pizzaName,
          sauce: this.chosenSauce,
          dough: this.chosenDough,
          size: this.chosenSize,
          ingredients: this.chosenIngredients,
        });
        this.resetBuilder();
      }
    },
  },
};
</script>
