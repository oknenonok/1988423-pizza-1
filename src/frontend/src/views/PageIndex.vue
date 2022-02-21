<template>
  <main class="content">
    <form v-if="dataReady" action="#" method="post" @submit.prevent="submit">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  RESET_STATE,
  RESET_STATE_TO_CART_ITEM,
  SET_DOUGH,
  SET_INGREDIENT_QUANTITY,
  SET_PIZZA_NAME,
  SET_SAUCE,
  SET_SIZE,
  /* RESET_STATE_TO_CART_ITEM,
  SET_INGREDIENT_QUANTITY,
  SET_DOUGH,
  SET_SIZE,
  SET_SAUCE,
  SET_PIZZA_NAME,*/
} from "@/store/mutations-types";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderPizzaName from "@/modules/builder/components/BuilderPizzaName.vue";
import {
  ICartIngredient,
  ICartItem,
  IDough,
  ISauce,
  ISize,
} from "@/common/types";

type procedure = () => void;

@Component({
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderPizzaName,
  },

  computed: {
    ...mapState("Builder", ["pizzaName"]),
    ...mapState("Cart", ["cartItems"]),
    ...mapGetters("Builder", [
      "dataReady",
      "chosenDough",
      "chosenSize",
      "chosenSauce",
      "chosenIngredients",
    ]),
  },

  methods: {
    ...mapMutations("Builder", {
      resetBuilder: RESET_STATE,
    }),
    ...mapActions("Cart", ["addToCart"]),
  },
})
export default class PageIndex extends Vue {
  title = "Конструктор пиццы";
  unsubscribeCallback: null | procedure = null;
  editCartItemId = this?.$route?.query?.edit as string;
  pizzaName!: string;
  dataReady!: boolean;
  chosenDough!: IDough;
  chosenSize!: ISize;
  chosenSauce!: ISauce;
  chosenIngredients!: ICartIngredient[];
  resetBuilder!: procedure;
  addToCart!: (cartItem: Partial<ICartItem>) => void;
  cartItems!: ICartItem[];

  created() {
    this.$store.dispatch("Builder/init");
    let editCartItemId = +this.editCartItemId;
    if (editCartItemId) {
      let cartItem = this.cartItems.find((item) => item.id === editCartItemId);
      this.$store.commit(`Builder/${RESET_STATE_TO_CART_ITEM}`, cartItem);

      let subscribedMutations = [
        SET_INGREDIENT_QUANTITY,
        SET_DOUGH,
        SET_SIZE,
        SET_SAUCE,
        SET_PIZZA_NAME,
      ].map((mutation) => `Builder/${mutation}`);
      this.unsubscribeCallback = this.$store.subscribe((mutation) => {
        if (subscribedMutations.includes(mutation.type)) {
          this.$store.dispatch("Builder/updateCart", editCartItemId);
        }
      });
    }
  }

  beforeDestroy() {
    if (this.editCartItemId) {
      this.resetBuilder();
      if (this.unsubscribeCallback) {
        this.unsubscribeCallback();
      }
    }
  }

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
  }
}
</script>

<style lang="scss">
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
