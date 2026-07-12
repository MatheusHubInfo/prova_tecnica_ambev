class RegisterProductPage {
  elements = {
    nameInput: () => cy.get('[data-test="nome"]'),
    priceInput: () => cy.get('[data-test="preco"]'),
    descriptionInput: () => cy.get('[data-test="descricao"]'),
    quantityInput: () => cy.get('[data-test="quantidade"]'),
    submitButton: () => cy.get('[data-test="salvarDados"]'),
    alertMessage: () => cy.get('[data-test="alert"]'),
  };

  visit() {
    cy.visit('/admin/home');
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
