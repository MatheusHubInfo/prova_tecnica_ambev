import { AuthApi } from '../../services/api';

describe('API - Autenticação', () => {
  it('Deve realizar login com credenciais válidas e retornar token de autorização', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    AuthApi.login(email, password).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'Login realizado com sucesso');
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.be.a('string').and.not.be.empty;
    });
  });
});
