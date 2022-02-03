<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <AppSelect
        v-model="deliveryType"
        name="deliveryType"
        :options="deliveryOptions"
      />
    </label>

    <AppInput
      type="tel"
      class="input--big-label"
      name="phone"
      caption="Контактный телефон:"
      placeholder="+7 999-999-99-99"
      :value="phone"
      required
      input-mask="+7 ###-###-##-##"
      @input.native="setEntity($event)"
    />

    <div
      v-if="!isSelftake"
      class="cart-form__address"
    >
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput
          name="street"
          caption="Улица*"
          :value="street"
          :disabled="!canEditAddress"
          required
          @input.native="setEntity($event)"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="building"
          caption="Дом*"
          :value="building"
          :disabled="!canEditAddress"
          required
          @input.native="setEntity($event)"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="flat"
          caption="Квартира"
          :value="flat"
          :disabled="!canEditAddress"
          @input.native="setEntity($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  SET_DELIVERY_TYPE,
  SET_ENTITY,
} from "@/store/mutations-types";
import {
  DELIVERY_TYPE_NEW,
  DELIVERY_TYPE_SELFTAKE,
} from "@/common/constants";

export default {
  name: "CartAddress",

  computed: {
    ...mapState("Cart", ["phone", "street", "building", "flat"]),
    ...mapState("Addresses", ["addresses"]),

    deliveryOptions() {
      return [
        {
          key: DELIVERY_TYPE_SELFTAKE,
          title: "Заберу сам",
        },

        {
          key: DELIVERY_TYPE_NEW,
          title: "Новый адрес",
        },

        ...this.addresses.map((address) => ({
          key: address.id,
          title: address.name,
        })),
      ];
    },

    isSelftake() {
      return this.deliveryType === DELIVERY_TYPE_SELFTAKE;
    },

    canEditAddress() {
      return [DELIVERY_TYPE_SELFTAKE, DELIVERY_TYPE_NEW].includes(this.deliveryType);
    },

    deliveryType: {
      get() {
        return this.$store.state.Cart.deliveryType;
      },

      set(value) {
        return this.$store.commit(`Cart/${SET_DELIVERY_TYPE}`, value);
      },
    },
  },

  methods: {
    /**
     * Сохранить поле контактной информации
     * @param {object} event
     */
    setEntity({target: {name, value}}) {
      this.$store.commit(SET_ENTITY, {
        module: "Cart",
        entity: name,
        value,
      });
    },
  },
};
</script>

<style lang="scss">
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}
</style>
