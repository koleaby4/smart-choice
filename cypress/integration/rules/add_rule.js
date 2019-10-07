/// <reference types="Cypress" />

import { clickStartCtaButton } from "../landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  clickAddRowButton
} from "../../helpers/create_rule";

describe("Users can create a new rule", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("with single criterion", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    enterRuleName(`Test-rule ${tail}`);
    enterCriterionName(`Criterion ${tail}`);
    enterNote(`Note ${tail}`);

    submitRule();

    cy.location("pathname").should("eq", "/rules");

    cy.get(".rule li")
      .first()
      .should("contain", tail);
  });

  it("with multiple criteria", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    enterRuleName(`Rule 1 ${tail}`);
    enterCriterionName(`Criterion 1 ${tail}`);
    enterNote(`Note 1 ${tail}`);

    clickAddRowButton();

    enterRuleName(`Rule 2 ${tail}`);
    enterCriterionName(`Criterion 2 ${tail}`);
    enterNote(`Note 2 ${tail}`);

    submitRule();

    cy.location("pathname").should("eq", "/rules");

    cy.get(".rule li")
      .first()
      .should("contain", tail);
  });
});
