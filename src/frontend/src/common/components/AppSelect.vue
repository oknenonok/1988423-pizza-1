<template>
  <select
    class="select"
    :name="name"
    :required="required"
    :disabled="disabled"
    @change="$emit('input', $event.target.value)"
  >
    <option
      v-for="{ key, title } in options"
      :key="key"
      :value="key"
      :selected="`${value}` === `${key}`"
    >
      {{ title }}
    </option>
  </select>
</template>

<script>
export default {
  name: "AppSelect",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },

    options: {
      type: Array,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
