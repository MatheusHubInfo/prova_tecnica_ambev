class HomePage {
  elements = {
    homeTitle: () => cy.get('[data-test="home"]'),
    logoutButton: () => cy.get('[data-test="logout"]'),
    registerProductsLink: () => cy.get('[data-test="cadastrarProdutos"]'),
    listProductsLink: () => cy.get('[data-test="listarProdutos"]'),
    registerUsersLink: () => cy.get('[data-test="cadastrarUsuarios"]'),
    listUsersLink: () => cy.get('[data-test="listarUsuarios"]'),
  };

  shouldBeVisible() {
    this.elements.homeTitle().should('be.visible');
    return this;
  }

  logout() {
    this.elements.logoutButton().click();
    return this;
  }

  goToRegisterProducts() {
    this.elements.registerProductsLink().click();
    return this;
  }

  goToListProducts() {
    this.elements.listProductsLink().click();
    return this;
  }

  goToRegisterUsers() {
    this.elements.registerUsersLink().click();
    return this;
  }
}

export default new HomePage();
