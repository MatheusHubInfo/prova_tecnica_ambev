import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class RegisterUserPage extends BasePage {
  elements = {
    nameInput: () => this.getByTestId('nome'),
    emailInput: () => this.getByTestId('email'),
    passwordInput: () => this.getByTestId('password'),
    adminCheckbox: () => this.getByTestId('checkbox'),
    submitButton: () => this.getByTestId('cadastrar'),
    adminSubmitButton: () => this.getByTestId('cadastrarUsuario'),
    nameRequiredMessage: () =>
      cy.get('#root > div > div > div > form > div:nth-child(1)'),
    emailRequiredMessage: () =>
      cy.get('#root > div > div > div > form > div:nth-child(2)'),
    passwordRequiredMessage: () =>
      cy.get('#root > div > div > div > form > div:nth-child(3)'),
  };

  visit() {
    super.visit(ROUTES.registerUser);
    return this;
  }

  shouldShowAdminForm() {
    cy.url().should('include', ROUTES.adminRegisterUsers);
    cy.contains('h1', 'Cadastro de usuários').should('be.visible');

    cy.contains('label', 'Nome:').should('be.visible');
    cy.get('#nome')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite seu nome');

    cy.contains('label', 'Email:').should('be.visible');
    cy.get('#email')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite seu email');

    cy.contains('label', 'Senha:').should('be.visible');
    cy.get('#password')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite sua senha');

    cy.contains('Cadastrar como administrador?').should('be.visible');
    this.elements.adminCheckbox().should('be.visible');
    this.elements
      .adminSubmitButton()
      .should('be.visible')
      .and('contain.text', 'Cadastrar');

    return this;
  }

  submitAdminForm() {
    this.elements.adminSubmitButton().click();
    return this;
  }

  shouldShowRequiredMessages() {
    this.elements
      .nameRequiredMessage()
      .should('be.visible')
      .and('contain.text', 'Nome é obrigatório');

    this.elements
      .emailRequiredMessage()
      .should('be.visible')
      .and('contain.text', 'Email é obrigatório');

    this.elements
      .passwordRequiredMessage()
      .should('be.visible')
      .and('contain.text', 'Password é obrigatório');

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
