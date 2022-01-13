<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        name="test"
        class="select"
        @change="setDeliveryType($event.target.value)"
      >
        <option
          v-for="{id, name} in deliveryOptions"
          :key="id"
          :value="id"
          :selected="deliveryType === id"
        >{{ name }}</option>
      </select>
    </label>

    <AppInput
      type="tel"
      class="input--big-label"
      name="phone"
      caption="Контактный телефон:"
      placeholder="+7 999-999-99-99"
      :value="phone"
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
          @input.native="setEntity($event)"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="building"
          caption="Дом*"
          :value="building"
          @input.native="setEntity($event)"
        />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput
          name="flat"
          caption="Квартира"
          :value="flat"
          @input.native="setEntity($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
} from "vuex";
import {
  SET_DELIVERY_TYPE,
  SET_ENTITY,
} from "@/store/mutations-types";
import { DELIVERY_TYPE_NEW, DELIVERY_TYPE_SELFTAKE } from "@/common/constants";

export default {
  name: "CartAddress",

  computed: {
    ...mapState("Cart", ["deliveryType", "phone", "street", "building", "flat"]),

    deliveryOptions() {
      return [
        {
          id: DELIVERY_TYPE_SELFTAKE,
          name: "Заберу сам",
        },
        {
          id: DELIVERY_TYPE_NEW,
          name: "Новый адрес",
        },
      ];
    },

    isSelftake() {
      return this.deliveryType === DELIVERY_TYPE_SELFTAKE;
    },
  },

  methods: {
    ...mapMutations("Cart", {
      setDeliveryType: SET_DELIVERY_TYPE,
    }),
    setEntity($event) {
      this.$store.commit(SET_ENTITY, {
        module: "Cart",
        entity: $event.target.name,
        value: $event.target.value,
      });
    },
  },
};
</script>
