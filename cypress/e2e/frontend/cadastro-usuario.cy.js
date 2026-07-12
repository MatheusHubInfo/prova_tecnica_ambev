import RegisterUserPage from '../../pages/RegisterUserPage';
import { UsersApi } from '../../services/api';
import { MESSAGES, ROUTES } from '../../support/constants';
import { buildUser } from '../../support/factories';
import users from '../../fixtures/users.json';

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

  it('Deve exibir as mensagens dos campos obrigatórios', () => {
    cy.loginByUi(users.adminUser.email, users.adminUser.password);
    cy.visit(ROUTES.adminRegisterUsers);

    RegisterUserPage.submitAdminForm();
    RegisterUserPage.shouldShowRequiredMessages();
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const newUser = buildUser({ nome: 'Novo Usuario Automacao' });
    createdUserEmail = newUser.email;

    RegisterUserPage.visit();
    RegisterUserPage.register(newUser);
    RegisterUserPage.shouldShowAlertWith(MESSAGES.registerSuccess);
  });
});
