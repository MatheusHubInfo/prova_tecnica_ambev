class LoginPage {
  elements = {
    emailInput: () => cy.get('[data-test="email"]'),
    passwordInput: () => cy.get('[data-test="senha"]'),
    submitButton: () => cy.get('[data-test="entrar"]'),
    registerLink: () => cy.get('[data-test="cadastrar"]'),
    alertMessage: () => cy.get('[data-test="alert"]'),
  };

  visit() {
    cy.visit('/');
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
