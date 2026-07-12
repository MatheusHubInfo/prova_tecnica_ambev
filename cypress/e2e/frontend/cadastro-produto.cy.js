import HomePage from '../../pages/HomePage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';
import { ProductsApi } from '../../services/api';
import { ROUTES } from '../../support/constants';
import { buildProduct } from '../../support/factories';

describe('Frontend - Cadastro de Produto', () => {
  let adminUser;
  let createdProductName;

  before(() => {
    return cy.createAdminUser().then((user) => {
      adminUser = user;
    });
  });

  beforeEach(() => {
    cy.loginByUi(adminUser.email, adminUser.password);
    cy.visit('/admin/home');
    HomePage.shouldBeVisible();
  });

  after(() => {
    if (adminUser) {
      return cy.deleteUser(adminUser.id);
    }
  });

  afterEach(() => {
    if (!createdProductName) return;

    return cy
      .apiLogin(adminUser.email, adminUser.password)
      .then((loginResponse) =>
        ProductsApi.findByName(
          createdProductName,
          loginResponse.body.authorization,
        ),
      )
      .then((searchResponse) => {
        const createdProduct = searchResponse.body.produtos[0];
        if (!createdProduct) return;

        return ProductsApi.delete(
          createdProduct._id,
          Cypress.env('authToken'),
        ).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });
  });

  it('Deve cadastrar um produto e exibi-lo na listagem', () => {
    const product = buildProduct({
      nome: `Produto E2E ${Date.now()}`,
      preco: 2999,
      quantidade: 5,
    });
    createdProductName = product.nome;

    HomePage.goToRegisterProducts();
    RegisterProductPage.register(product);

    cy.url().should('include', ROUTES.listProducts);
    ListProductsPage.shouldContainProduct(product.nome);
  });
});
