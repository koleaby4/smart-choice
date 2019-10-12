/// <reference types="Cypress" />

import { clickStartCtaButton } from "../landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  clickAddRowButton,
  deleteRule
} from "../../helpers/create_rule";

describe("Users can create rules", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const testRulePrefix = 'Test-rule';

  after(() => {
    cy.get('li').contains(testRulePrefix).each(() => deleteRule(testRulePrefix))
  })


  it("with single criterion and delete it", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    const ruleName = `${testRulePrefix} ${tail}`

    enterRuleName(ruleName);
    enterCriterionName(`Criterion ${tail}`);
    enterNote(`Note ${tail}`);

    submitRule();

    cy.location("pathname").should("eq", "/rules");

    cy.get(".rule li")
      .first()
      .should("contain", ruleName);

    deleteRule(ruleName)
  });

  it("with multiple criteria", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    enterRuleName(`${testRulePrefix} 1 ${tail}`);
    enterCriterionName(`Criterion 1 ${tail}`);
    enterNote(`Note 1 ${tail}`);

    clickAddRowButton();

    enterCriterionName(`Criterion 2 ${tail}`);
    enterNote(`Note 2 ${tail}`);

    submitRule();

    cy.location("pathname").should("eq", "/rules");

    cy.get(".rule li")
      .first()
      .should("contain", tail);
  });
});
