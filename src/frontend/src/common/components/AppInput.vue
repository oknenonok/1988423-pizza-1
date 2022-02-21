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
    />
  </label>
</template>

<script lang="ts">
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppInput extends Vue {
  @Prop({ default: "" }) readonly value!: string | number;
  @Prop({ required: true }) readonly name!: string;
  @Prop({ default: "text" }) readonly type!: string;
  @Prop({ default: "" }) readonly placeholder!: string;
  @Prop({ default: false }) readonly required!: boolean;
  @Prop({ default: false }) readonly disabled!: boolean;
  @Prop({ default: "" }) readonly caption!: string;
  @Prop({ default: false }) readonly hideCaption!: boolean;
  @Prop({ default: null }) readonly inputMask!: string | null;

  get bindValues() {
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
</script>

<style lang="scss">
.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
