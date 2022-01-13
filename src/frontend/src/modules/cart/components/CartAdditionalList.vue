<template>
  <ul class="additional-list">
    <li
      v-for="item in misc"
      :key="item.id"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="item.image"
          width="39"
          height="60"
          :alt="item.name"
        >
        <span>
          {{ item.name }}
        </span>
      </p>

      <div class="additional-list__wrapper">
        <AppItemCounter
          class="additional-list__counter"
          :value="getMiscQuantity(item.id)"
          counter-button-class="counter__button--orange"
          @change="setMiscQuantity({id: item.id, quantity: $event})"
        />

        <div class="additional-list__price">
          <b>× {{ $priceFormat(item.price) }}</b>
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
