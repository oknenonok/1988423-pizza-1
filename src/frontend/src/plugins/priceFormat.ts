import { LOCALE } from "@/common/constants";
import _Vue from "vue";

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$priceFormat = (price: number) => {
      return new Intl.NumberFormat(LOCALE, {
        style: "currency",
        currency: "RUB",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price);
    };
  },
};
