import { UsersApi } from '../../services/api';
import { MESSAGES } from '../../support/constants';
import { buildUser } from '../../support/factories';

describe('API - Usuários', () => {
  let createdUserId;

  afterEach(() => {
    if (!createdUserId) return;

    return UsersApi.delete(createdUserId).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq(MESSAGES.deleteSuccess);
      createdUserId = null;
    });
  });

  it('Deve cadastrar um novo usuário via API com sucesso', () => {
    const newUser = buildUser({
      nome: 'Usuario API Automacao',
      administrador: 'true',
    });

    UsersApi.create(newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq(MESSAGES.registerSuccess);
      expect(response.body._id).to.be.a('string').and.not.be.empty;

      createdUserId = response.body._id;
    });
  });
});
