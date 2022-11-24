describe('Widget render and logic testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('renders on load', () => {
    cy.get('.frc-container')
        .should('exist')
  })

  it('should either immediately check for auth or show a button for it', () => {
    cy.get('.frc-button').then(($button) => {
      if ($button.length > 0) {
        cy.wrap($button)
            .click()
        cy.wait(2000)
        cy.get('.frc-success')
            .should('not.exist')
        cy.get('#submit-btn')
            .should('not.exist')
      } else {

      }
    })
  })
})
