
export const editRule = ruleName =>
  cy.contains(ruleName).parent('.rule').find('[class~=edit-rule]').click()
    .then(() => cy.location('pathname').should('match', /\/rules\/.+/))

export const assertRuleName = (ruleIndex, expectedName) =>
  cy.get(".rule [data-test=rule-name]")
    .eq(ruleIndex)
    .should("contain", expectedName);
