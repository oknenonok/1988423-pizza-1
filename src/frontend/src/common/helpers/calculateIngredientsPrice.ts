/**
 * Рассчитать стоимость ингредиентов
 * @param {array} ingredients
 * @returns {number}
 */
export default (ingredients: { price: number; quantity: number }[]): number => {
  return +ingredients
    .reduce(
      (total, ingredient) => total + ingredient.price * ingredient.quantity,
      0
    )
    .toFixed(2);
};
