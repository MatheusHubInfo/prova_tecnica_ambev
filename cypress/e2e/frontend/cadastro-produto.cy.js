import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';

describe('Frontend - Cadastro de Produto', () => {
  beforeEach(() => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    LoginPage.visit();
    LoginPage.login(email, password);
    HomePage.shouldBeVisible();
  });

  it('Deve cadastrar um produto e exibi-lo na listagem', () => {
    const timestamp = Date.now();
    const product = {
      nome: `Produto E2E ${timestamp}`,
      preco: 2999,
      descricao: 'Produto cadastrado via teste E2E Cypress',
      quantidade: 5,
    };

    HomePage.goToRegisterProducts();
    RegisterProductPage.register(product);

    RegisterProductPage.elements
      .alertMessage()
      .should('be.visible')
      .and('contain.text', 'Cadastro realizado com sucesso');

    ListProductsPage.visit();
    ListProductsPage.shouldContainProduct(product.nome);
  });
});
