export default {
  install(Vue) {
    Vue.prototype.$priceFormat = (price) => {
      return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(price);
    };
  },
};
