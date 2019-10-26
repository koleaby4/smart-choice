export const clickComparison = () =>
    cy.get('[data-test=nav-comparison]').click().then(() =>
        cy.location('pathname').should('contain', '/comparison')
    )

export const clickRules = () =>
    cy.get('[data-test=nav-rules]').click().then(() =>
        cy.location('pathname').should('contain', '/rules'))