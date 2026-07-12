import BasePage from './BasePage';
import { ROUTES, LOGIN_SELECTORS } from '../support/constants';

class LoginPage extends BasePage {
  elements = {
    emailInput: () => cy.get(LOGIN_SELECTORS.email),
    passwordInput: () => cy.get(LOGIN_SELECTORS.password),
    submitButton: () => cy.get(LOGIN_SELECTORS.submitButton),
    registerLink: () => this.getByTestId('cadastrar'),
  };

  visit() {
    super.visit(ROUTES.login);
    return this;
  }

  fillEmail(email) {
    this.elements.emailInput().should('be.visible').clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.elements.passwordInput().should('be.visible').clear().type(password);
    return this;
  }

  submit() {
    this.elements.submitButton().should('be.visible').click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  goToRegister() {
    this.elements.registerLink().click();
    return this;
  }
}

export default new LoginPage();
