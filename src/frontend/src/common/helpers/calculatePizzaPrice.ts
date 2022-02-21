import { IDough, ISize, ISauce } from "../types";

/**
 * Рассчитать стоимость пиццы
 * @param {object} {dough
 * @param {object} size
 * @param {object} sauce
 * @param {number} ingredientsPrice}
 * @returns {number}
 */
interface IParams {
  dough: IDough | undefined;
  size: ISize | undefined;
  sauce: ISauce | undefined;
  ingredientsPrice: number;
}
export default ({ dough, size, sauce, ingredientsPrice }: IParams): number => {
  return +(
    ((dough?.price ?? 0) + (sauce?.price ?? 0) + ingredientsPrice) *
    (size?.multiplier ?? 0)
  ).toFixed(2);
};
