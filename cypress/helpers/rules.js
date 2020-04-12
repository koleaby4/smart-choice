
export const editRule = ruleName =>
  cy.contains(ruleName).click()
    .then(() => cy.location('pathname').should('match', /\/rules\/.+/))

export const assertRuleName = (ruleIndex, expectedName) =>
  cy.get(".rule [data-test=rule-name]")
    .eq(ruleIndex).invoke('text').should('eq', expectedName)
