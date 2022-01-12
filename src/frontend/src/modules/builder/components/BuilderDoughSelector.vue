<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">
      Выберите тесто
    </h2>

    <div class="sheet__content dough">
      <AppRadioButton
        v-for="doughItem in dough"
        :key="doughItem.id"
        class="dough__input"
        :class="`dough__input--${doughItem.value}`"
        name="dought"
        :value="doughItem.id"
        input-class="visually-hidden"
        :checked="chosenDoughId === doughItem.id"
        @select="setDough($event)"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </AppRadioButton>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations
} from "vuex";
import { SET_DOUGH } from "@/store/mutations-types";

export default {
  name: "BuilderDoughSelector",

  computed: {
    ...mapState("Builder", ["chosenDoughId"]),
    ...mapGetters(["dough"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setDough: SET_DOUGH,
    }),
  },
};
</script>
