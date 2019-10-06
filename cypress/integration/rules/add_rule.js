/// <reference types="Cypress" />

describe("Users can create a new rule", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("with single criterion", () => {
    cy.get("#start-cta-button").click();
    cy.get("#createRuleButton").click();

    const tail = Date.now();
    cy.get("#rule_name").type(`Test-rule ${tail}`);
    cy.get("[name^=name]")
      .last()
      .type(`Criterion ${tail}`);

    cy.get("[name^=note]")
      .last()
      .type(`Note ${tail}`);

    cy.get("[data-test=submit-button]").click();

    cy.get(".rule li")
      .contains(tail)
      .should("be.visible");
  });
});
