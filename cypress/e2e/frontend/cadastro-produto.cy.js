import HomePage from '../../pages/HomePage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';
import { ProductsApi } from '../../services/api';
import { ROUTES } from '../../support/constants';
import { buildProduct } from '../../support/factories';
import users from '../../fixtures/users.json';

describe('Frontend - Cadastro de Produto', () => {
  let createdProductName;

  // Garante uma sessão autenticada e inicia cada teste na Home.
  beforeEach(() => {
    cy.loginByUi(users.adminUser.email, users.adminUser.password);
    cy.visit('/admin/home');
    HomePage.shouldBeVisible();
  });

  // Busca e exclui o produto criado para manter o ambiente limpo.
  afterEach(() => {
    if (!createdProductName) return;

    let authToken;

    return cy
      .apiLogin(users.adminUser.email, users.adminUser.password)
      .then((loginResponse) => {
        authToken = loginResponse.body.authorization;
        return ProductsApi.findByName(createdProductName, authToken);
      })
      .then((searchResponse) => {
        const createdProduct = searchResponse.body.produtos[0];
        if (!createdProduct) return;

        return ProductsApi.delete(createdProduct._id, authToken).then(
          (deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
            createdProductName = null;
          },
        );
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
