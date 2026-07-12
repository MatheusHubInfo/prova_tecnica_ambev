import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class HomePage extends BasePage {
  elements = {
    homeTitle: () => this.getByTestId('home'),
    logoutButton: () => this.getByTestId('logout'),
    registerProductsLink: () => this.getByTestId('cadastrarProdutos'),
    listProductsLink: () => this.getByTestId('listarProdutos'),
    registerUsersLink: () => this.getByTestId('cadastrarUsuarios'),
    listUsersLink: () => this.getByTestId('listarUsuarios'),
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

  shouldBeOnHomePage() {
    cy.url().should('include', ROUTES.home);
    return this;
  }
}

export default new HomePage();
