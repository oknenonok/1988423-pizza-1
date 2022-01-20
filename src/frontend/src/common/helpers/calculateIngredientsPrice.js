/**
 * Рассчитать стоимость ингредиентов
 * @param {array} ingredients
 * @returns {number}
 */
export default (ingredients) => {
  return ingredients.reduce(
    (total, ingredient) => total + ingredient.price * ingredient.quantity,
    0
  );
};
