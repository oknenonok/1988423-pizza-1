/**
 * Рассчитать стоимость пиццы
 * @param {object} {dough
 * @param {object} size
 * @param {object} sauce
 * @param {number} ingredientsPrice}
 * @returns {number}
 */
export default ({ dough, size, sauce, ingredientsPrice }) => {
  return +(
    ((dough?.price ?? 0) +
      (sauce?.price ?? 0) +
      ingredientsPrice
    ) * (size?.multiplier ?? 0)
  ).toFixed(2);
};
