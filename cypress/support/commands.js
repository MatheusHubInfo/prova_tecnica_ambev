/**
 * Realiza login via API e armazena o token de autorização.
 * Útil para testes de API e setup de cenários E2E.
 */
Cypress.Commands.add('apiLogin', (email, password) => {
  const credentials = {
    email: email || Cypress.env('userEmail'),
    password: password || Cypress.env('userPassword'),
  };

  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/login`,
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
 * Requisição autenticada à API Serverest.
 */
Cypress.Commands.add('apiRequest', (options) => {
  const token = Cypress.env('authToken');

  return cy.request({
    ...options,
    url: options.url.startsWith('http')
      ? options.url
      : `${Cypress.env('apiUrl')}${options.url}`,
    headers: {
      ...options.headers,
      ...(token && { Authorization: token }),
    },
  });
});

/**
 * Gera e-mail único para evitar conflitos em cadastros.
 */
Cypress.Commands.add('generateUniqueEmail', () => {
  const timestamp = Date.now();
  return `usuario.teste.${timestamp}@serverest.dev`;
});
