const API_BASE_URL = Cypress.env('apiUrl');

export const UsersApi = {
  create(user) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/usuarios`,
      body: user,
      failOnStatusCode: false,
    });
  },

  getById(id, token) {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/usuarios/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  delete(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/usuarios/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};

export const AuthApi = {
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/login`,
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};

export const ProductsApi = {
  create(product, token) {
    return cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/produtos`,
      body: product,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  list(token) {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/produtos`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  getById(id, token) {
    return cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/produtos/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  delete(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/produtos/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};
