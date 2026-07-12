import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class ListProductsPage extends BasePage {
  elements = {
    productsTable: () => cy.get('table'),
    searchInput: () => this.getByTestId('pesquisar'),
  };

  visit() {
    super.visit(ROUTES.listProducts);
    return this;
  }

  shouldContainProduct(productName) {
    this.elements.productsTable().should('be.visible');
    cy.contains('td', productName).should('be.visible');
    return this;
  }

  searchProduct(productName) {
    this.elements.searchInput().clear().type(productName);
    return this;
  }
}

export default new ListProductsPage();
