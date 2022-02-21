<template>
  <div class="sheet">
    <h2 class="title title--small sheet__title">Выберите тесто</h2>

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
        @select="setDough"
      >
        <b>{{ doughItem.name }}</b>
        <span>{{ doughItem.description }}</span>
      </AppRadioButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapGetters, mapMutations } from "vuex";
import { SET_DOUGH } from "@/store/mutations-types";
import { IDough } from "@/common/types";

@Component({
  computed: {
    ...mapState("Builder", ["chosenDoughId"]),
    ...mapGetters(["dough"]),
  },

  methods: {
    ...mapMutations("Builder", {
      setDough: SET_DOUGH,
    }),
  },
})
export default class BuilderDoughSelector extends Vue {
  chosenDoughId!: number;
  dough!: IDough;
  setDough!: (doughId: number) => void;
}
</script>

<style lang="scss">
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
