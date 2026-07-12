import HomePage from '../../pages/HomePage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';
import { MESSAGES } from '../../support/constants';
import { buildProduct } from '../../support/factories';

describe('Frontend - Cadastro de Produto', () => {
  beforeEach(() => {
    cy.loginByUi();
    cy.visit('/admin/home');
    HomePage.shouldBeVisible();
  });

  it('Deve cadastrar um produto e exibi-lo na listagem', () => {
    const product = buildProduct({
      nome: `Produto E2E ${Date.now()}`,
      preco: 2999,
      quantidade: 5,
    });

    HomePage.goToRegisterProducts();
    RegisterProductPage.register(product);
    RegisterProductPage.shouldShowAlertWith(MESSAGES.registerSuccess);

    ListProductsPage.visit();
    ListProductsPage.shouldContainProduct(product.nome);
  });
});
