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
      cy.get('[data-test="home"]').should('be.visible');
    },
    { cacheAcrossSpecs: false },
  );
});

/**
 * Gera e-mail único para evitar conflitos em cadastros.
 */
Cypress.Commands.add('generateUniqueEmail', () => {
  const timestamp = Date.now();
  return `usuario.teste.${timestamp}@serverest.dev`;
});
