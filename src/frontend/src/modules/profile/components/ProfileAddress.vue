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
        <AppButton
          v-if="!isNew"
          class="button--transparent"
          :disabled="isSaving"
          caption="Удалить"
          @click="removeAddress"
        />
        <AppButton type="submit" :disabled="isSaving" caption="Сохранить" />
      </div>
    </form>

    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ index }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <AppIcon caption="Изменить адрес" @click="editAddress" />
        </div>
      </div>
      <p>{{ addressString }}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapState } from "vuex";
import isNew from "@/common/helpers/isNew";
import { IAddress } from "@/common/types";

@Component({
  computed: {
    ...mapState("Addresses", ["addresses"]),
  },
})
export default class ProfileAddress extends Vue {
  @Prop({ type: Object, required: true }) readonly address!: IAddress;
  @Prop({ type: Number, required: true }) readonly index!: number;
  name!: string;
  street!: string;
  building!: string;
  flat!: string;
  comment!: string;
  isSaving!: boolean;
  isEditing!: boolean;

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
  }

  get addressString() {
    return (
      this.street +
      (this.building ? `, д. ${this.building}` : "") +
      (this.flat ? `, кв. ${this.flat}` : "")
    );
  }

  get isNew() {
    return isNew(this.address.id);
  }

  created() {
    this.isEditing = this.isNew;
  }

  editAddress() {
    this.isEditing = true;
  }

  async removeAddress() {
    await this.$store.dispatch("Addresses/remove", this.address);
  }

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
  }
}
</script>

<style lang="scss">
.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
