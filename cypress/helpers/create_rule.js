export const clickCreateRuleButton = () => cy.get("#createRuleButton").click();

export const clickAddRowButton = () => cy.get("#addrow").click();

export const enterRuleName = name => cy.get("#rule_name").type(name);

export const enterCriterionName = name =>
  cy
    .get("[name^=name]")
    .last()
    .type(name);

export const enterNote = note =>
  cy
    .get("[name^=note]")
    .last()
    .type(note);

export const submitRule = () => cy.get("[data-test=submit-button]").click();

export const deleteRule = ruleName =>
  cy.contains(ruleName).first().parent().find('[class~=delete-rule-button]').click()
    .then(deletedRule => cy.wrap(deletedRule).should('not.exist'))

