<template>
  <AppInput
    :value="pizzaName"
    type="text"
    name="pizza_name"
    placeholder="Введите название пиццы"
    caption="Название пиццы"
    hide-caption
    @input="setPizzaName($event)"
  />
</template>

<script>
import {
  mapState,
  mapMutations,
} from "vuex";
import { SET_PIZZA_NAME } from "@/store/mutations-types";

export default {
  name: "BuilderPizzaName",

  computed: {
    ...mapState("Builder", ["pizzaName"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaName: SET_PIZZA_NAME,
    }),
  },
};
</script>
