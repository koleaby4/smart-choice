/// <reference types="Cypress" />

import { clickStartCtaButton } from "../helpers/landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  clickAddRowButton,
  enterMultiplier
} from "../helpers/rule_details";
import { clickComparisons } from "../helpers/nav";
import {
  selectRule, enterOptionName,
  enterComparisonName, selectScores,
  assertWeightedScore, clickAddRow,
  assertTotal, saveComparison, clickCreateComparisonButton
} from "../helpers/comparison";

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


  it("based on existing rule", () => {
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

    clickComparisons()
    clickCreateComparisonButton()

    let comparisonName = `[Test] Car Comparison ${Date.now()}`
    enterComparisonName(comparisonName)
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

    assertTotal('28');

    saveComparison();

    cy.contains(comparisonName).should('be.visible')
  });
});

