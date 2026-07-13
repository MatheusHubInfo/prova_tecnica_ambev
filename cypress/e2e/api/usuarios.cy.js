import { UsersApi } from '../../services/api';
import { MESSAGES } from '../../support/constants';
import { buildUser } from '../../support/factories';

describe('API - Usuários', () => {
  let adminUser;
  let authToken;
  let createdUserId;

  before(() => {
    return cy
      .createAdminUser()
      .then((user) => {
        adminUser = user;
        return cy.apiLogin(user.email, user.password);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        authToken = response.body.authorization;
      });
  });

  afterEach(() => {
    if (!createdUserId) return;

    return UsersApi.delete(createdUserId, authToken).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(MESSAGES.deleteSuccess);
      createdUserId = null;
    });
  });

  after(() => {
    if (!adminUser) return;
    return cy.deleteUser(adminUser._id, authToken);
  });

  it('Deve cadastrar um novo usuário via API com sucesso', () => {
    const newUser = buildUser({
      nome: 'Usuario API Automacao',
      administrador: 'true',
    });

    UsersApi.create(newUser, authToken).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(MESSAGES.registerSuccess);
      expect(response.body._id).to.be.a('string').and.not.be.empty;

      createdUserId = response.body._id;
    });
  });
});
