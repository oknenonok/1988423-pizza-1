<template>
  <div class="layout__address">
    <form
      v-if="isEditing"
      class="address-form address-form--opened sheet"
      @submit.prevent="saveAddress"
    >
      <div class="address-form__header">
        <b>Адрес №{{ index }}</b>
      </div>

      <div class="address-form__wrapper">
        <div class="address-form__input">
          <AppInput
            v-model="name"
            name="name"
            placeholder="Введите название адреса"
            caption="Название адреса*"
            :disabled="isSaving"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <AppInput
            v-model="street"
            name="street"
            placeholder="Введите название улицы"
            caption="Улица*"
            :disabled="isSaving"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="building"
            name="building"
            placeholder="Введите номер дома"
            caption="Дом*"
            :disabled="isSaving"
            required
          />
        </div>
        <div class="address-form__input address-form__input--size--small">
          <AppInput
            v-model="flat"
            name="flat"
            placeholder="Введите № квартиры"
            caption="Квартира"
            :disabled="isSaving"
          />
        </div>
        <div class="address-form__input">
          <AppInput
            v-model="comment"
            name="comment"
            placeholder="Введите комментарий"
            caption="Комментарий"
            :disabled="isSaving"
          />
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          v-if="!isNew"
          type="button"
          class="button button--transparent"
          :disabled="isSaving"
          @click="removeAddress"
        >
          Удалить
        </button>
        <button
          type="submit"
          class="button"
          :disabled="isSaving"
        >
          Сохранить
        </button>
      </div>
    </form>

    <div
      v-else
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ index }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="editAddress"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ addressString }}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import isNew from "@/common/helpers/isNew";

export default {
  name: "ProfileAddress",

  props: {
    address: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      name: this.address.name,
      street: this.address.street,
      building: this.address.building,
      flat: this.address.flat,
      comment: this.address.comment,
      isSaving: false,
      isEditing: false,
    };
  },

  computed: {
    ...mapState("Addresses", ["addresses"]),

    addressString() {
      return this.street
        + (this.building ? `, д. ${this.building}` : "")
        + (this.flat ? `, кв. ${this.flat}` : "");
    },

    isNew() {
      return isNew(this.address.id);
    },
  },

  created() {
    this.isEditing = this.isNew;
  },

  methods: {
    editAddress() {
      this.isEditing = true;
    },

    async removeAddress() {
      await this.$store.dispatch("Addresses/remove", this.address);
    },

    async saveAddress() {
      this.isSaving = true;
      try {
        await this.$store.dispatch("Addresses/save", {
          ...this.address,
          name: this.name,
          street: this.street,
          building: this.building,
          flat: this.flat,
          comment: this.comment,
        });
        this.isEditing = false;
      } finally {
        this.isSaving = false;
      }
    },
  },
};
</script>
