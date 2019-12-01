/// <reference types="Cypress" />

import { clickStartCtaButton } from "../helpers/landing";
import {
  clickCreateRuleButton,
  enterRuleName,
  enterCriterionName,
  submitRule,
  enterNote,
  deleteRule,
} from "../helpers/rule_details";
import { clickRules } from "../helpers/nav";
import { editRule, assertRuleName } from "../helpers/rules";

describe("Users can edit rules", () => {
  const testRulePrefix = '[Test-rule]';

  after(() =>
    clickRules().then(() => {
      cy.contains(testRulePrefix).its('length').then(entriesCount => {
        if (entriesCount > 0) {
          deleteRule(testRulePrefix)
        }
      })
    }
    )
  )


  it("change all values", () => {
    cy.visit("/");

    clickStartCtaButton();
    clickCreateRuleButton();


    const oldRuleName = `${testRulePrefix} Old Rule Name ${Date.now()}`

    enterRuleName(oldRuleName);
    enterCriterionName(`Old criterion`);
    enterNote(`Old note`);

    submitRule();

    assertRuleName(0, oldRuleName);

    editRule(oldRuleName)

    const newRuleName = `${testRulePrefix} New Rule Name ${Date.now()}`

    enterRuleName(newRuleName);
    enterCriterionName(`Proximity`);
    enterNote(`Closer -> better`);

    submitRule();
    assertRuleName(0, newRuleName);
  });
});

