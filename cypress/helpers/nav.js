export const clickComparisons = () =>
    cy.get('[data-test=nav-comparisons]').click().then(() =>
        cy.location('pathname').should('contain', '/comparisons')
    )

export const clickRules = () =>
    cy.get('[data-test=nav-rules]').click().then(() =>
        cy.location('pathname').should('contain', '/rules'))