import RegisterUserPage from '../../pages/RegisterUserPage';
import { UsersApi } from '../../services/api';
import { MESSAGES } from '../../support/constants';
import { buildUser } from '../../support/factories';

describe('Frontend - Cadastro de Usuário', () => {
  let createdUserEmail;

  afterEach(() => {
    if (!createdUserEmail) return;

    return UsersApi.findByEmail(createdUserEmail).then((searchResponse) => {
      const createdUser = searchResponse.body.usuarios[0];
      if (!createdUser) return;

      return UsersApi.delete(createdUser._id).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
      });
    });
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const newUser = buildUser({ nome: 'Novo Usuario Automacao' });
    createdUserEmail = newUser.email;

    RegisterUserPage.visit();
    RegisterUserPage.register(newUser);
    RegisterUserPage.shouldShowAlertWith(MESSAGES.registerSuccess);
  });
});
