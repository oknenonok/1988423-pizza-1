<template>
  <button
    class="icon"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="visually-hidden">
      {{ caption }}
    </span>
  </button>
</template>

<script>
export default {
  name: "AppIcon",

  props: {
    caption: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "button",
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>
