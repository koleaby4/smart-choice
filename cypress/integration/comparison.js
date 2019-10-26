/// <reference types="Cypress" />

import { clickStartCtaButton } from "../helpers/landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  clickAddRowButton,
  deleteRules
} from "../helpers/rule_details";
import { clickComparison, clickRules } from "../helpers/nav";
import { selectRule } from "../helpers/comparison";

describe("Users can create comparison", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const testRulePrefix = 'Test-rule';

  // after(() =>
  //   clickRules().then(() =>
  //     deleteRules(testRulePrefix)
  //   )
  // )


  it.only("based on existing rule", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const ruleName = `${testRulePrefix} 3 ${Date.now()}`
    enterRuleName(ruleName);
    enterCriterionName(`Criterion A`);
    enterNote(`Note A`);

    clickAddRowButton();

    enterCriterionName(`Criterion B`);
    enterNote(`Note B`);

    submitRule();

    clickComparison()
    selectRule(ruleName)
  });
});

