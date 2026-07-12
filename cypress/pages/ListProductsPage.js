class ListProductsPage {
  elements = {
    productsTable: () => cy.get('table'),
    productRows: () => cy.get('tbody tr'),
    searchInput: () => cy.get('[data-test="pesquisar"]'),
  };

  visit() {
    cy.visit('/admin/listarprodutos');
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
