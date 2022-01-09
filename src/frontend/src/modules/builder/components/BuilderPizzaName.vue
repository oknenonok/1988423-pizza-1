<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      :value="value"
      placeholder="Введите название пиццы"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderPizzaName",

  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>
