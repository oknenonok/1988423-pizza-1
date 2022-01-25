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
