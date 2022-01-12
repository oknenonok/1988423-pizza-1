<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите размер
    </h2>

    <div class="sheet__content diameter">
      <AppRadioButton
        v-for="size in sizes"
        :key="size.id"
        class="diameter__input"
        :class="`diameter__input--${size.value}`"
        name="diameter"
        :value="size.id"
        :checked="chosenSizeId === size.id"
        input-class="visually-hidden"
        @select="setSize($event)"
      >
        <span>{{ size.name }}</span>
      </AppRadioButton>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations
} from "vuex";
import { SET_SIZE } from "@/store/mutations-types";

export default {
  name: "BuilderSizeSelector",

  computed: {
    ...mapState("Builder", ["chosenSizeId"]),
    ...mapGetters(["sizes"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setSize: SET_SIZE,
    }),
  },
};
</script>
