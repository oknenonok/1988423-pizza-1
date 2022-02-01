<template>
  <div class="counter">
    <button
      type="button"
      data-test="minus"
      class="counter__button counter__button--minus"
      :disabled="value <= minValue"
      @click="addValue(-1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="number"
      name="counter"
      class="counter__input"
      onfocus="this.select()"
      :min="minValue"
      :max="maxValue"
      :value="value"
      @input="valueChanged"
    >
    <button
      type="button"
      data-test="plus"
      class="counter__button counter__button--plus"
      :class="counterButtonClass"
      :disabled="value >= maxValue"
      @click="addValue(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "AppItemCounter",
  props: {
    minValue: {
      type: Number,
      default: 0,
    },

    maxValue: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER,
    },

    value: {
      type: Number,
      required: true,
      validator: (v) => Number.isInteger(v),
    },

    counterButtonClass: {
      type: String,
      default: "",
    },
  },

  methods: {
    valueChanged(event) {
      let newValue = +event.target.value,
        setValue;
      if (newValue >= this.minValue && newValue <= this.maxValue) {
        setValue = newValue;
      } else {
        if (newValue > this.maxValue) {
          setValue = this.maxValue;
        } else {
          setValue = this.minValue;
        }
      }
      this.$emit("input", setValue);
    },

    addValue(value) {
      if (
        (this.value < this.maxValue && value > 0) ||
        (this.value > this.minValue && value < 0)
      ) {
        this.$emit("input", this.value + value);
      }
    },
  },
};
</script>
