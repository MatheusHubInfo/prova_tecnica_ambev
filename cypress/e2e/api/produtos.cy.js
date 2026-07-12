import { ProductsApi } from '../../services/api';
import { MESSAGES } from '../../support/constants';
import { buildProduct } from '../../support/factories';

describe('API - Produtos', () => {
  let authToken;
  let createdProductId;

  before(() => {
    cy.apiLogin().then((response) => {
      expect(response.status).to.eq(200);
      authToken = response.body.authorization;
    });
  });

  afterEach(() => {
    if (!createdProductId || !authToken) return;

    ProductsApi.delete(createdProductId, authToken);
    createdProductId = null;
  });

  it('Deve cadastrar um produto via API e consultá-lo pelo ID', () => {
    const product = buildProduct({
      nome: `Produto API ${Date.now()}`,
      preco: 1999,
      quantidade: 15,
    });

    ProductsApi.create(product, authToken).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body.message).to.eq(MESSAGES.registerSuccess);
      expect(createResponse.body._id).to.be.a('string').and.not.be.empty;

      createdProductId = createResponse.body._id;

      ProductsApi.getById(createdProductId, authToken).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body._id).to.eq(createdProductId);
        expect(getResponse.body.nome).to.eq(product.nome);
        expect(getResponse.body.preco).to.eq(product.preco);
        expect(getResponse.body.descricao).to.eq(product.descricao);
        expect(getResponse.body.quantidade).to.eq(product.quantidade);
      });
    });
  });
});
