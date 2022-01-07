/**
 * Отформатировать цену
 * @param {number} price
 * @returns {string}
 */
export const priceFormat = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};
