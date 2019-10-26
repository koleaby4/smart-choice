export const selectRule = ruleName =>
    cy.get('[data-test=rules-list]').select(ruleName)