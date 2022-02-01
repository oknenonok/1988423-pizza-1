<template>
  <label class="input">
    <span
      v-if="caption"
      data-test="caption"
      :class="{ 'visually-hidden': hideCaption }"
    >
      {{ caption }}
    </span>
    <the-mask
      v-if="inputMask"
      :mask="inputMask"
      v-bind="bindValues"
      @input="$emit('input', $event)"
    />
    <input
      v-else
      v-bind="bindValues"
      @input="$emit('input', $event.target.value)"
    >
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
    disabled: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      default: "",
    },
    hideCaption: {
      type: Boolean,
      default: false,
    },
    inputMask: {
      type: String,
      default: null,
    },
  },

  computed: {
    bindValues() {
      return {
        value: this.value,
        type: this.type,
        name: this.name,
        placeholder: this.placeholder,
        required: this.required,
        disabled: this.disabled,
      };
    }
  }
};
</script>
