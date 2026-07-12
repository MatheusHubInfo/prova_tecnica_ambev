import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class LoginPage extends BasePage {
  elements = {
    emailInput: () => this.getByTestId('email'),
    passwordInput: () => this.getByTestId('senha'),
    submitButton: () => this.getByTestId('entrar'),
    registerLink: () => this.getByTestId('cadastrar'),
  };

  visit() {
    super.visit(ROUTES.login);
    return this;
  }

  fillEmail(email) {
    this.elements.emailInput().clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.elements.passwordInput().clear().type(password);
    return this;
  }

  submit() {
    this.elements.submitButton().click();
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
