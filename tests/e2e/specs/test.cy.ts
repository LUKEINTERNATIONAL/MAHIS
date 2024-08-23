describe('My First Test', () => {
  it('Login happy path', () => {
    const username = "Admin";
    const password = "test";

    cy.visit('/')
    cy.url().should('include', '/login');
    cy.get('[cy-test="username-input"]').type(username);
    cy.get('[cy-test="username-input"]').should('have.value', username);

    cy.get('[cy-test="password-input"]').type(password);
    cy.get('[cy-test="password-input"]').should('have.value', password);

    cy.get('[cy-test="program-select"]').type("Imm {enter}");
    cy.get('[cy-test="login-button"]').click();
    cy.url().should('include', '/home');
    cy.pause();

  })
})
