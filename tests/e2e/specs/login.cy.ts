describe('Login Tests', () => {
  const username = "mwayab";
  const password = "test";

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('[cy-test="username-input"]').type(username);
    cy.get('[cy-test="username-input"]').should('have.value', username);
    cy.get('[cy-test="password-input"]').type(password);
    cy.get('[cy-test="password-input"]').should('have.value', password);
  });

  it('Login happy path for different programs', function () {
    cy.fixture('programs.json').then((programs) => {
      programs.forEach((program) => {
        cy.get('[cy-test="program-select"]').type(`${program.name}{enter}`);
        cy.get('[cy-test="login-button"]').click();
        cy.url({ timeout: 10000 }).should('include', '/home');
        // Additional checks specific to the program can be added here
        cy.visit('/login'); // Navigate back to login page for the next program
      });
    });
  });
});