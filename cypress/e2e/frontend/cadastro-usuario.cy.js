import RegisterUserPage from '../../pages/RegisterUserPage';
import { UsersApi } from '../../services/api';
import { MESSAGES, ROUTES } from '../../support/constants';
import { buildUser } from '../../support/factories';

describe('Frontend - Cadastro de Usuário', () => {
  let adminUser;
  let createdUserEmail;

  before(() => {
    return cy.createAdminUser().then((user) => {
      adminUser = user;
    });
  });

  // Busca e exclui o usuário criado para não deixar dados de teste na API.
  afterEach(() => {
    if (!createdUserEmail) return;

    return UsersApi.findByEmail(createdUserEmail).then((searchResponse) => {
      const createdUser = searchResponse.body.usuarios[0];
      if (!createdUser) return;

      return UsersApi.delete(createdUser._id).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        createdUserEmail = null;
      });
    });
  });

  after(() => {
    if (!adminUser) return;
    return cy.deleteUser(adminUser._id);
  });

  it('Deve exibir as mensagens dos campos obrigatórios', () => {
    cy.loginByUi(adminUser.email, adminUser.password);
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
