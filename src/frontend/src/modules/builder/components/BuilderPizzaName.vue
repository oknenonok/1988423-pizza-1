<template>
  <AppInput
    v-model="pizzaName"
    type="text"
    name="pizza_name"
    placeholder="Введите название пиццы"
    caption="Название пиццы"
    required
    hide-caption
  />
</template>

<script>
import { SET_PIZZA_NAME } from "@/store/mutations-types";

export default {
  name: "BuilderPizzaName",

  computed: {
    pizzaName: {
      get() {
        return this.$store.state.Builder.pizzaName;
      },
      set(value) {
        return this.$store.commit(`Builder/${SET_PIZZA_NAME}`, value);
      },
    },
  },
};
</script>
