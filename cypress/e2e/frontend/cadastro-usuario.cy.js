import RegisterUserPage from '../../pages/RegisterUserPage';

describe('Frontend - Cadastro de Usuário', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    cy.generateUniqueEmail().then((email) => {
      const newUser = {
        nome: 'Novo Usuario Automacao',
        email,
        password: 'senha123',
        administrador: false,
      };

      RegisterUserPage.visit();
      RegisterUserPage.register(newUser);

      RegisterUserPage.elements
        .alertMessage()
        .should('be.visible')
        .and('contain.text', 'Cadastro realizado com sucesso');
    });
  });
});
