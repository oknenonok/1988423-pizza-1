const WAIT_REQUEST = {
  "userId": null,
  "phone": "+7 900-123-45-67",
  "address": null,
  "pizzas": [
    {
      "name": "new",
      "sauceId": 2,
      "doughId": 2,
      "sizeId": 1,
      "quantity": 2,
      "ingredients": [{ "ingredientId": 1, "quantity": 1 }, { "ingredientId": 2, "quantity": 2 }]
    }
  ],
  "misc": [{ "miscId": 2, "quantity": 1 }]
};

describe("App", () => {
  it("Make order", () => {
    cy.intercept({
      method: "POST",
      url: "http://localhost:3000/orders",
    }, {}).as("postOrder");

    cy.visit("/");
    cy.contains("h1", "Конструктор пиццы");
    cy.get("p[data-test=finalPrice]").contains("700");
    cy.get(".pizza").should("have.class", "pizza--foundation--light-tomato");

    cy.get(".diameter__input--small").click();
    cy.get("p[data-test=finalPrice]").contains("350");

    const dataTransfer = new DataTransfer();
    cy.get(".filling--cheddar").trigger("dragstart", { dataTransfer });
    cy.get(".pizza").trigger("drop", { dataTransfer });
    cy.get("p[data-test=finalPrice]").contains("392");
    cy.get(".filling--cheddar").trigger("dragstart", { dataTransfer });
    cy.get(".pizza").trigger("drop", { dataTransfer });
    cy.get("p[data-test=finalPrice]").contains("434");

    cy.get(".filling--mushrooms + .counter > .counter__button--plus").click();
    cy.get(".pizza__filling--mushrooms").should("exist");
    cy.get(".pizza__filling--cheddar.pizza__filling--second").should("exist");
    cy.get(".pizza__filling--cheddar:not(.pizza__filling--second)").should("exist");
    cy.get("p[data-test=finalPrice]").contains("467");

    cy.get(".dough__input--large").click();
    cy.get(".pizza").should("have.class", "pizza--foundation--large-tomato");

    cy.get(".ingredients__input:last").click();
    cy.get(".pizza").should("have.class", "pizza--foundation--large-creamy");

    cy.get("input[name=pizza_name]").type("new", { force: true });
    cy.get("button[type=submit]").click();
    cy.get("p[data-test=finalPrice]").contains("700");
    cy.get(".header__cart").contains("467");

    cy.get(".header__cart").click();
    cy.get(".footer__price").contains("467");

    cy.get(".cart-list__counter .counter__button--plus").click();
    cy.get(".footer__price").contains("934");

    cy.get(".additional-list__counter:eq(1) .counter__button--plus").click();
    cy.get(".footer__price").contains("944");

    cy.get("input[name=phone]").type("9001234567", { force: true });
    cy.get("button[type=submit]").click();
    cy.wait("@postOrder");
    cy.get("@postOrder").should(({ request }) => {
      expect(request.body).to.deep.equal(WAIT_REQUEST);
    });
    cy.get(".popup__button").contains("Отлично, я жду!");
    cy.get(".popup__button").click();
    cy.get(".header__cart").contains("0");
    cy.url().should("eq", Cypress.config().baseUrl);
  })
});
