/// <reference types="Cypress" />

import { clickStartCtaButton } from "../helpers/landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  clickAddRowButton,
  deleteRules,
  deleteLastCriterion
} from "../helpers/rule_details";
import { clickRules } from "../helpers/nav";

describe("Users can create rules", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const testRulePrefix = '[Test-rule]';

  after(() =>
    clickRules().then(() =>
      deleteRules(testRulePrefix)
    )
  )


  it("with single criterion and delete it", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    const ruleName = `${testRulePrefix} ${tail}`

    enterRuleName(ruleName);
    enterCriterionName(`Criterion ${tail}`);
    enterNote(`Note ${tail}`);

    submitRule();

    cy.get(".rule li")
      .first()
      .should("contain", ruleName);

    deleteRules(ruleName)

    cy.contains(ruleName).should('not.exist')
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

    cy.get(".rule li")
      .first()
      .should("contain", tail);
  });

  it.only("and delete criterion", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const tail = Date.now();

    enterRuleName(`${testRulePrefix} delete criterion ${tail}`);
    enterCriterionName(`Criterion 1 ${tail}`);

    clickAddRowButton();

    const crterionToDelete = 'criterion to delete'
    enterCriterionName(crterionToDelete);

    deleteLastCriterion()

    cy.contains(crterionToDelete).should('not.exist')
  });
});

