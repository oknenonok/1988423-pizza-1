<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

    <div class="sheet__content dough">
      <RadioButton
        v-for="doughItem in dough"
        :key="doughItem.id"
        class="dough__input"
        :class="`dough__input--${doughItem.value}`"
        name="dought"
        :value="doughItem.id"
        inputClass="visually-hidden"
        :checked="chosenDoughId === doughItem.id"
        @select="$emit('select', +$event)"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </RadioButton>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },

  props: {
    dough: {
      type: Array,
      required: true,
    },
    chosenDoughId: {
      type: Number,
      required: true,
    },
  },
};
</script>
