import calculatePizzaPrice from "@/common/helpers/calculatePizzaPrice";

describe("calculatePizzaPrice", () => {
  it("test calculatePizzaPrice", () => {
    expect(calculatePizzaPrice({
      dough: { price: 100 },
      size: { multiplier: 1.5 },
      sauce: { price: 44},
      ingredientsPrice: 105.2
    })).toBe(373.8);

    expect(calculatePizzaPrice({
      dough: null,
      size: { multiplier: 1.5 },
      sauce: { price: 44},
      ingredientsPrice: 105.2
    })).toBe(223.8);
  });
});
