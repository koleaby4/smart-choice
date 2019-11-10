
export const editRule = ruleName =>
  cy.contains(ruleName).parent('.rule').find('[class~=edit-rule]').click()
    .then(() => cy.location('pathname').should('match', /\/rules\/.+/))
