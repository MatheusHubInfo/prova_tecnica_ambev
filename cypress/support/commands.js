import { API_URL, API_ENDPOINTS, ROUTES, LOGIN_SELECTORS } from './constants';
import { UsersApi } from '../services/api';
import { buildUser } from './factories';

/**
 * Cria um administrador temporário para a execução de uma suíte.
 */
Cypress.Commands.add('createAdminUser', () => {
  const adminUser = buildUser({
    nome: 'Administrador Automacao',
    administrador: 'true',
  });

  return UsersApi.create(adminUser).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body._id).to.be.a('string').and.not.be.empty;

    return { ...adminUser, _id: response.body._id };
  });
});

/**
 * Exclui o administrador temporário criado para a suíte.
 */
Cypress.Commands.add('deleteUser', (userId, token) => {
  return UsersApi.delete(userId, token).then((response) => {
    expect(response.status).to.eq(200);
    return response;
  });
});

/**
 * Realiza login via API e armazena o token de autorização.
 */
Cypress.Commands.add('apiLogin', (email, password) => {
  const credentials = {
    email: email || Cypress.env('userEmail'),
    password: password || Cypress.env('userPassword'),
  };

  return cy
    .request({
      method: 'POST',
      url: `${API_URL}${API_ENDPOINTS.login}`,
      body: credentials,
      failOnStatusCode: false,
    })
    .then((response) => {
      if (response.status === 200 && response.body.authorization) {
        Cypress.env('authToken', response.body.authorization);
      }
      return response;
    });
});

/**
 * Reutiliza sessão de login no frontend entre testes (cy.session).
 */
Cypress.Commands.add('loginByUi', (email, password) => {
  const userEmail = email || Cypress.env('userEmail');
  const userPassword = password || Cypress.env('userPassword');

  cy.session(
    ['login', userEmail],
    () => {
      cy.visit(ROUTES.login);
      cy.get(LOGIN_SELECTORS.email).clear().type(userEmail);
      cy.get(LOGIN_SELECTORS.password).clear().type(userPassword);
      cy.get(LOGIN_SELECTORS.submitButton).click();
      cy.get('.jumbotron h1')
        .should('be.visible')
        .and('contain.text', 'Bem Vindo');
    },
    { cacheAcrossSpecs: false },
  );
});
