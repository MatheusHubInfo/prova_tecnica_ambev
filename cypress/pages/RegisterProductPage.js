import BasePage from './BasePage';

class RegisterProductPage extends BasePage {
  elements = {
    nameInput: () => this.getByTestId('nome'),
    priceInput: () => this.getByTestId('preco'),
    descriptionInput: () => this.getByTestId('descricao'),
    quantityInput: () => this.getByTestId('quantity'),
    submitButton: () => this.getByTestId('cadastarProdutos'),
  };

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
