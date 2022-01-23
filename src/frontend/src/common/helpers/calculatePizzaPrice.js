/**
 * Рассчитать стоимость пиццы
 * @param {object} {dough
 * @param {object} size
 * @param {object} sauce
 * @param {number} ingredientsPrice}
 * @returns {number}
 */
export default ({ dough, size, sauce, ingredientsPrice }) => {
  return (
    (dough.price +
      sauce.price +
      ingredientsPrice
    ) * size.multiplier
  );
};
