<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

    <div class="sheet__content ingredients">
      <div class="ingredients__sauce">
        <p>Основной соус:</p>

        <AppRadioButton
          v-for="sauce in sauces"
          :key="sauce.id"
          class="radio ingredients__input"
          name="sauce"
          :value="sauce.id"
          :checked="chosenSauceId === sauce.id"
          @select="setSauce"
        >
          <span>{{ sauce.name }}</span>
        </AppRadioButton>
      </div>

      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            class="ingredients__item"
          >
            <AppDrag
              :transfer-data="ingredient.id"
              :draggable="getIngredientQuantity(ingredient.id) < maxQuantity"
              class="filling"
              :class="`filling--${ingredient.value}`"
            >
              {{ ingredient.name }}
            </AppDrag>

            <AppItemCounter
              class="counter--orange ingredients__counter"
              :value="getIngredientQuantity(ingredient.id)"
              :max-value="maxQuantity"
              @input="
                setIngredientQuantity({
                  ingredientId: ingredient.id,
                  quantity: $event,
                })
              "
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters, mapMutations } from "vuex";
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import { SET_INGREDIENT_QUANTITY, SET_SAUCE } from "@/store/mutations-types";
import AppDrag from "@/common/components/AppDrag.vue";
import { IIngredient, ISauce } from "@/common/types";

@Component({
  components: {
    AppDrag,
  },
  computed: {
    ...mapState("Builder", ["chosenSauceId"]),
    ...mapGetters(["ingredients", "sauces"]),
    ...mapGetters("Builder", ["getIngredientQuantity"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setSauce: SET_SAUCE,
      setIngredientQuantity: SET_INGREDIENT_QUANTITY,
    }),
  },
})
export default class BuilderIngredientsSelector extends Vue {
  maxQuantity = MAX_INGREDIENT_QUANTITY;
  chosenSauceId!: number;
  ingredients!: IIngredient[];
  sauces!: ISauce[];
  getIngredientQuantity!: (ingredientId: number) => number;
  setSauce!: (sauceId: number) => void;
  setIngredientQuantity!: ({
    ingredientId,
    quantity,
  }: {
    ingredientId: number;
    quantity: number;
  }) => void;
}
</script>

<style lang="scss">
.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
