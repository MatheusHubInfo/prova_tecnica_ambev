import { UsersApi } from '../../services/api';

describe('API - Usuários', () => {
  let createdUserId;

  afterEach(() => {
    if (createdUserId && Cypress.env('authToken')) {
      UsersApi.delete(createdUserId, Cypress.env('authToken'));
    }
  });

  it('Deve cadastrar um novo usuário via API com sucesso', () => {
    cy.generateUniqueEmail().then((email) => {
      const newUser = {
        nome: 'Usuario API Automacao',
        email,
        password: 'senha123',
        administrador: 'true',
      };

      UsersApi.create(newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso');
        expect(response.body).to.have.property('_id');

        createdUserId = response.body._id;
      });
    });
  });
});
