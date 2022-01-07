<template>
  <label class="input">
    <span class="visually-hidden">Название пиццы</span>
    <input
      type="text"
      name="pizza_name"
      :value="name"
      placeholder="Введите название пиццы"
      @input="$emit('changeName', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "BuilderPizzaName",

  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
