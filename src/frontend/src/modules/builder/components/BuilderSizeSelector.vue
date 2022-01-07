<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите размер</h2>

    <div class="sheet__content diameter">
      <RadioButton
        v-for="size in sizes"
        :key="size.id"
        class="diameter__input"
        :class="`diameter__input--${size.value}`"
        name="diameter"
        :value="size.id"
        :checked="chosenSizeId === size.id"
        inputClass="visually-hidden"
        @select="$emit('select', +$event)"
      >
        <span>{{ size.name }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },

  props: {
    sizes: {
      type: Array,
      required: true,
    },
    chosenSizeId: {
      type: Number,
      required: true,
    },
  },
};
</script>
