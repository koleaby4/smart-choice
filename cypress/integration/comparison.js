/// <reference types="Cypress" />

import { clickStartCtaButton } from "../helpers/landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  clickAddRowButton,
  enterMultiplier
} from "../helpers/rule_details";
import { clickComparison, clickRules } from "../helpers/nav";
import { selectRule, enterOptionName, enterComparisonName, selectScores, assertWeightedScore, clickAddRow, assertTotal } from "../helpers/comparison";

describe("Users can create comparison", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  const testRulePrefix = '[Test-rule]';

  // after(() =>
  //   clickRules().then(() =>
  //     deleteRules(testRulePrefix)
  //   )
  // )


  it.only("based on existing rule", () => {
    clickStartCtaButton();
    clickCreateRuleButton();

    const ruleName = `${testRulePrefix} Cars ${Date.now()}`

    enterRuleName(ruleName);
    enterCriterionName(`Brand recognition`);
    enterMultiplier("5")

    clickAddRowButton();
    enterCriterionName(`Reliability`);
    enterMultiplier("4")

    submitRule();

    clickComparison()

    enterComparisonName('[Test] Car Comparison')
    selectRule(ruleName)

    enterOptionName('Mercedes')
    selectScores(["5", "3"])

    assertWeightedScore(0, '25')
    assertWeightedScore(1, '12')

    assertTotal('37')

    clickAddRow()

    enterOptionName('BMW')
    selectScores(["4", "2"])

    assertWeightedScore(0, '20')
    assertWeightedScore(1, '8')

    assertTotal('28')
  });
});

