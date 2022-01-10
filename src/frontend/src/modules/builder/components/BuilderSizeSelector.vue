<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите размер
    </h2>

    <div class="sheet__content diameter">
      <AppRadioButton
        v-for="size in sizes"
        :key="size.id"
        class="diameter__input"
        :class="`diameter__input--${size.value}`"
        name="diameter"
        :value="size.id"
        :checked="chosenSizeId === size.id"
        input-class="visually-hidden"
        @select="$emit('select', +$event)"
      >
        <span>{{ size.name }}</span>
      </AppRadioButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderSizeSelector",

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
