import { AuthApi } from '../../services/api';
import { MESSAGES } from '../../support/constants';

describe('API - Autenticação', () => {
  let adminUser;

  before(() => {
    cy.createAdminUser().then((user) => {
      adminUser = user;
    });
  });

  after(() => {
    if (adminUser) {
      return cy.deleteUser(adminUser.id);
    }
  });

  it('Deve realizar login com credenciais válidas e retornar token de autorização', () => {
    AuthApi.login(adminUser.email, adminUser.password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(MESSAGES.loginSuccess);
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
      expect(response.body.authorization).to.match(/^Bearer\s.+$/);
    });
  });
});
