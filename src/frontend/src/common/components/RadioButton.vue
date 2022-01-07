<template>
  <label>
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      :class="inputClass"
      @change="$emit('select', $event.target.value)"
    />
    <slot />
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
  },
};
</script>
