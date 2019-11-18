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
    cy.get('[data-test=save-comparison]').click()
        .then(() => cy.location('pathname').should('eq', '/comparisons'))


export const clickCreateComparisonButton = () =>
    cy.get('#createComparisonButton').click()
        .then(() => cy.location('pathname').should('eq', '/comparison'))