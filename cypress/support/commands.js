import { API_URL, API_ENDPOINTS, ROUTES, LOGIN_SELECTORS } from './constants';

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
 * Cria um administrador temporário para deixar os testes independentes.
 */
Cypress.Commands.add('createAdminUser', () => {
  const timestamp = Date.now();
  const user = {
    nome: 'Teste Automacao',
    email: `admin.teste.${timestamp}@serverest.dev`,
    password: 'senha123',
    administrador: 'true',
  };

  return cy
    .request({
      method: 'POST',
      url: `${API_URL}${API_ENDPOINTS.users}`,
      body: user,
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return { ...user, id: response.body._id };
    });
});

/**
 * Remove um usuário temporário criado durante a execução.
 */
Cypress.Commands.add('deleteUser', (userId) => {
  return cy.request({
    method: 'DELETE',
    url: `${API_URL}${API_ENDPOINTS.users}/${userId}`,
    failOnStatusCode: false,
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
