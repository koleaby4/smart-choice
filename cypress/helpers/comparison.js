export const clickAddRow = () =>
    cy.get('#addrow').click()

export const selectRule = ruleName =>
    cy.get('[data-test=rules-list]').select(ruleName)

export const enterOptionName = optionName =>
    cy.get('[name*=option]').last().type(optionName)

export const enterComparisonName = comparisonName =>
    cy.get('#comparison_name').last().type(comparisonName)

export const assertWeightedScore = (index, expectedValue) =>
    cy.get('#comparison-table tbody tr').last().find('[name=weighted_score]').eq(index).invoke('text').should('eq', expectedValue)

export const assertTotal = expectedValue =>
    cy.get('#comparison-table tbody tr').last().find('[name=total]').invoke('text').should('eq', expectedValue)

export const selectScores = scores => {
    for (let i = 0; i < scores.length; i++) {
        cy.get('#comparison-table tbody tr').last().find('select').eq(i).select(scores[i])
    }
}

export const saveComparison = () =>
    cy.get('[data-test=save-comparison]')
        .scrollIntoView()
        .should('be.visible')
        .click()
        .then(() => cy.location('pathname').should('eq', '/comparisons'))


export const clickCreateComparisonButton = () =>
    cy.get('#createComparisonButton').click()
        .then(() => cy.location('pathname').should('eq', '/comparison'))

export const deleteComparisons = comparisonNameToDelete =>
    cy.get('[data-test=comparison-name]').each(comparison => cy.wrap(comparison).invoke('text')
        .then(comparisonName => {
            if (comparisonName.includes(comparisonNameToDelete)) {
                cy.wrap(comparison).parents('tr').find('[class~=delete-comparison]').click()
            }
        }))

export const viewComparison = comparisonName =>
    cy.contains(comparisonName).click()

export const assertOptionContains = (index, name, totalScore) =>
    cy.get('tbody tr').eq(index).then(row => {
        cy.wrap(row).find('[data-test=option-name]').should('contain', name);
        cy.wrap(row).find('[data-test=total-score]').should('contain', totalScore);
    })