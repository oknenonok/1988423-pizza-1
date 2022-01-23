<template>
  <label class="input">
    <span
      v-if="caption"
      :class="{ 'visually-hidden': hideCaption }"
    >
      {{ caption }}
    </span>
    <component
      :is="componentName"
      :mask="inputMask"
      v-bind="{ value, type, name, placeholder, required, disabled }"
      @input="handleInput"
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
    disabled: {
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
    inputMask: {
      type: String,
      default: null,
    },
  },

  computed: {
    componentName() {
      return this.inputMask ? "the-mask" : "input";
    },
  },

  methods: {
    handleInput($event) {
      this.$emit("input", $event.target ? $event.target.value : $event);
    },
  },
};
</script>
