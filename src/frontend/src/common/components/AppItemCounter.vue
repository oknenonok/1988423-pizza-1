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

<style lang="scss">
.counter {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.counter__button {
  $el: &;
  $size_icon: 50%;

  position: relative;

  display: block;

  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;

  &--minus {
    background-color: $purple-100;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $black;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $purple-200;
    }

    &:active:not(:disabled) {
      background-color: $purple-300;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      &::before {
        opacity: 0.1;
      }
    }
  }

  &--plus {
    background-color: $green-500;

    &::before {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";

      border-radius: 2px;
      background-color: $white;
    }

    &::after {
      @include p_center-all;

      width: $size_icon;
      height: 2px;

      content: "";
      transform: translate(-50%, -50%) rotate(90deg);

      border-radius: 2px;
      background-color: $white;
    }

    &:hover:not(:active):not(:disabled) {
      background-color: $green-400;
    }

    &:active:not(:disabled) {
      background-color: $green-600;
    }

    &:focus:not(:disabled) {
      box-shadow: $shadow-regular;
    }

    &:disabled {
      cursor: default;

      opacity: 0.3;
    }
  }

  &--orange {
    background-color: $orange-200;

    &:hover:not(:active):not(:disabled) {
      background-color: $orange-100;
    }

    &:active:not(:disabled) {
      background-color: $orange-300;
    }
  }
}

.counter__input {
  @include r-s14-h16;

  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  appearance: textfield;

  text-align: center;

  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;

  &:focus {
    box-shadow: inset $shadow-regular;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
}
</style>
