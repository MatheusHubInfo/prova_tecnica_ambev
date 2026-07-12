import RegisterUserPage from '../../pages/RegisterUserPage';
import { MESSAGES } from '../../support/constants';
import { buildUser } from '../../support/factories';

describe('Frontend - Cadastro de Usuário', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    const newUser = buildUser({ nome: 'Novo Usuario Automacao' });

    RegisterUserPage.visit();
    RegisterUserPage.register(newUser);
    RegisterUserPage.shouldShowAlertWith(MESSAGES.registerSuccess);
  });
});
