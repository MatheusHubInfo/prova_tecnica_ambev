import { AuthApi, ProductsApi } from '../../services/api';

describe('API - Produtos', () => {
  let authToken;
  let createdProductId;

  before(() => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    AuthApi.login(email, password).then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.authorization;
      Cypress.env('authToken', authToken);
    });
  });

  afterEach(() => {
    if (createdProductId && authToken) {
      ProductsApi.delete(createdProductId, authToken);
    }
  });

  it('Deve cadastrar um produto via API e consultá-lo pelo ID', () => {
    const timestamp = Date.now();
    const product = {
      nome: `Produto API ${timestamp}`,
      preco: 1999,
      descricao: 'Produto criado via teste de API Cypress',
      quantidade: 15,
    };

    ProductsApi.create(product, authToken).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(createResponse.body).to.have.property('_id');

      createdProductId = createResponse.body._id;

      ProductsApi.getById(createdProductId, authToken).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body.nome).to.eq(product.nome);
        expect(getResponse.body.preco).to.eq(product.preco);
        expect(getResponse.body.descricao).to.eq(product.descricao);
        expect(getResponse.body.quantidade).to.eq(product.quantidade);
      });
    });
  });
});
