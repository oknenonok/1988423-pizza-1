<template>
  <label class="input">
    <span v-if="caption" :class="{ 'visually-hidden': hideCaption }">
      {{ caption }}
    </span>
    <input
      v-bind="{ value, type, name, placeholder, required }"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    value: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      default: "text",
    },
    hideCaption: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
