import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';

describe('Frontend - Login', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Deve realizar login com credenciais válidas e exibir a página inicial', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    LoginPage.login(email, password);

    HomePage.shouldBeVisible();
    HomePage.elements.logoutButton().should('be.visible');
    cy.url().should('include', '/admin/home');
  });
});
