describe('My First Test', () => {
  it('Login happy path', () => {
    cy.visit('/')
    cy.url().should('include', '/login');
  })
})
