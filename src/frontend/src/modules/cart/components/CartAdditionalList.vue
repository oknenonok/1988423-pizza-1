<template>
  <ul class="additional-list">
    <li
      v-for="{id, image, name, price} in misc"
      :key="id"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="image"
          width="39"
          height="60"
          :alt="name"
        >
        <span>
          {{ name }}
        </span>
      </p>

      <div class="additional-list__wrapper">
        <AppItemCounter
          class="additional-list__counter"
          :value="getMiscQuantity(id)"
          counter-button-class="counter__button--orange"
          @input="setMiscQuantity({ id, quantity: $event })"
        />

        <div class="additional-list__price">
          <b>× {{ $priceFormat(price) }}</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {
  mapGetters,
  mapMutations,
} from "vuex";
import { SET_MISC_QUANTITY } from "@/store/mutations-types";

export default {
  name: "CartAdditionalList",

  computed: {
    ...mapGetters(["misc"]),
    ...mapGetters("Cart", ["getMiscQuantity"]),
  },

  methods: {
    ...mapMutations("Cart", {
      setMiscQuantity: SET_MISC_QUANTITY,
    }),
  },
};
</script>

<style lang="scss">
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  img {
    margin-right: 10px;
    margin-left: 15px;
  }

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
