// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands"

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.fixture("misc").then((json) => {
    cy.intercept("GET", "http://localhost:3000/misc", json).as("getMisc");
  });
  cy.fixture("pizza").then((json) => {
    cy.intercept("GET", "http://localhost:3000/dough", json.dough).as("getDough");
    cy.intercept("GET", "http://localhost:3000/sizes", json.sizes).as("getSizes");
    cy.intercept("GET", "http://localhost:3000/sauces", json.sauces).as("getSauces");
    cy.intercept("GET", "http://localhost:3000/ingredients", json.ingredients).as("getIngredients");
  });
});
