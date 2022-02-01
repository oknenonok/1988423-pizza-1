import calculateIngredientsPrice from "@/common/helpers/calculateIngredientsPrice";

describe("calculateIngredientsPrice", () => {
  it("test calculateIngredientsPrice", () => {
    expect(calculateIngredientsPrice([])).toBe(0);
    expect(calculateIngredientsPrice([
      {
        price: 50,
        quantity: 1,
      },
      {
        price: 33.3,
        quantity: 2,
      },
      {
        price: 0.2,
        quantity: 3,
      },
    ])).toBe(117.2);
  });
});
