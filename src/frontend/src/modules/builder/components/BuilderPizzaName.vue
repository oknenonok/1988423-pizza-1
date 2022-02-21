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

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SET_PIZZA_NAME } from "@/store/mutations-types";

@Component
export default class BuilderPizzaName extends Vue {
  get pizzaName() {
    return this.$store.state.Builder.pizzaName;
  }

  set pizzaName(value) {
    this.$store.commit(`Builder/${SET_PIZZA_NAME}`, value);
  }
}
</script>
