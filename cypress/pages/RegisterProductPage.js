import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class RegisterProductPage extends BasePage {
  elements = {
    nameInput: () => this.getByTestId('nome'),
    priceInput: () => this.getByTestId('preco'),
    descriptionInput: () => this.getByTestId('descricao'),
    quantityInput: () => this.getByTestId('quantity'),
    submitButton: () => this.getByTestId('cadastarProdutos'),
  };

  shouldShowForm() {
    cy.url().should('include', ROUTES.adminRegisterProducts);
    cy.contains('h1', 'Cadastro de Produtos').should('be.visible');

    cy.contains('label', 'Nome:').should('be.visible');
    cy.get('#nome')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite o nome do produto');

    cy.contains('label', 'Preço:').should('be.visible');
    cy.get('#price')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite o valor do produto');

    cy.contains('label', 'Descrição:').should('be.visible');
    cy.get('#description')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite a descrição do produto');

    cy.contains('label', 'Quantidade:').should('be.visible');
    cy.get('#quantity')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Digite aquantidade do produto');

    cy.contains('label', 'Imagem:').should('be.visible');
    cy.get('#imagem').should('be.visible');
    this.elements
      .submitButton()
      .should('be.visible')
      .and('contain.text', 'Cadastrar');

    return this;
  }

  fillForm({ nome, preco, descricao, quantidade }) {
    this.elements.nameInput().clear().type(nome);
    this.elements.priceInput().clear().type(String(preco));
    this.elements.descriptionInput().clear().type(descricao);
    this.elements.quantityInput().clear().type(String(quantidade));
    return this;
  }

  submit() {
    this.elements.submitButton().click();
    return this;
  }

  register(productData) {
    this.fillForm(productData);
    this.submit();
    return this;
  }
}

export default new RegisterProductPage();
