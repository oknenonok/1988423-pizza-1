<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ $priceFormat(order.price) }}</span>
      </div>

      <div class="order__button">
        <AppButton
          class="button--border"
          data-test="remove"
          caption="Удалить"
          @click="remove(order)"
        />
      </div>
      <div class="order__button">
        <AppButton data-test="repeat" caption="Повторить" @click="repeat" />
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <AppPizzaDescription :item="pizza" />

        <p class="order__price">
          <span v-if="pizza.quantity > 1">{{ pizza.quantity }} x</span>
          {{ $priceFormat(pizza.price) }}
        </p>
      </li>
    </ul>

    <ul v-if="order.orderMisc.length" class="order__additional">
      <li
        v-for="{ id, image, name, price, quantity } in order.orderMisc"
        :key="id"
      >
        <img :src="image" width="20" height="30" :alt="name" />
        <p>
          <span>{{ name }}</span>
          <b data-test="additionalPrice">
            <span v-if="quantity > 1">{{ quantity }} x</span>
            {{ $priceFormat(price) }}
          </b>
        </p>
      </li>
    </ul>

    <p class="order__address">
      {{ addressString }}
    </p>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { mapActions, mapMutations } from "vuex";
import AppPizzaDescription from "@/common/components/AppPizzaDescription.vue";
import { RESET_STATE_TO_ORDER } from "@/store/mutations-types";
import { ILocalOrder, IOrder } from "@/common/types";

@Component({
  components: {
    AppPizzaDescription,
  },
  methods: {
    ...mapActions("Orders", ["remove"]),
    ...mapMutations("Cart", {
      repeatOrder: RESET_STATE_TO_ORDER,
    }),
  },
})
export default class OrderInfo extends Vue {
  repeatOrder!: (order: IOrder) => void;

  @Prop({ type: Object, required: true }) readonly order!: ILocalOrder;

  get addressString() {
    return this.order.orderAddress
      ? "Адрес доставки: " +
          this.order.orderAddress.street +
          (this.order.orderAddress.building
            ? `, д. ${this.order.orderAddress.building}`
            : "") +
          (this.order.orderAddress.flat
            ? `, кв. ${this.order.orderAddress.flat}`
            : "")
      : "Самовывоз";
  }

  repeat() {
    this.repeatOrder(this.order);
    this.$router.push("/cart");
  }
}
</script>

<style lang="scss">
.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
