import { LOCALE } from "@/common/constants";

export default {
  install(Vue) {
    Vue.prototype.$priceFormat = (price) => {
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
