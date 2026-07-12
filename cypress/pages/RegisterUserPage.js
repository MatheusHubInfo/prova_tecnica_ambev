class RegisterUserPage {
  elements = {
    nameInput: () => cy.get('[data-test="nome"]'),
    emailInput: () => cy.get('[data-test="email"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    adminCheckbox: () => cy.get('[data-test="checkbox"]'),
    submitButton: () => cy.get('[data-test="cadastrar"]'),
    alertMessage: () => cy.get('[data-test="alert"]'),
  };

  visit() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillForm({ nome, email, password, administrador = false }) {
    this.elements.nameInput().clear().type(nome);
    this.elements.emailInput().clear().type(email);
    this.elements.passwordInput().clear().type(password);

    if (administrador) {
      this.elements.adminCheckbox().check({ force: true });
    }

    return this;
  }

  submit() {
    this.elements.submitButton().click();
    return this;
  }

  register(userData) {
    this.fillForm(userData);
    this.submit();
    return this;
  }
}

export default new RegisterUserPage();
