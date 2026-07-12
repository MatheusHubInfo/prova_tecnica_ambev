import { API_URL, API_ENDPOINTS } from '../../support/constants';

function buildUrl(endpoint) {
  return `${API_URL}${endpoint}`;
}

function authHeaders(token) {
  return token ? { Authorization: token } : {};
}

export const AuthApi = {
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: buildUrl(API_ENDPOINTS.login),
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};

export const UsersApi = {
  create(user) {
    return cy.request({
      method: 'POST',
      url: buildUrl(API_ENDPOINTS.users),
      body: user,
      failOnStatusCode: false,
    });
  },

  getById(id, token) {
    return cy.request({
      method: 'GET',
      url: `${buildUrl(API_ENDPOINTS.users)}/${id}`,
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  findByEmail(email, token) {
    return cy.request({
      method: 'GET',
      url: buildUrl(API_ENDPOINTS.users),
      qs: { email },
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  delete(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${buildUrl(API_ENDPOINTS.users)}/${id}`,
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },
};

export const ProductsApi = {
  create(product, token) {
    return cy.request({
      method: 'POST',
      url: buildUrl(API_ENDPOINTS.products),
      body: product,
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  list(token) {
    return cy.request({
      method: 'GET',
      url: buildUrl(API_ENDPOINTS.products),
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  findByName(nome, token) {
    return cy.request({
      method: 'GET',
      url: buildUrl(API_ENDPOINTS.products),
      qs: { nome },
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  getById(id, token) {
    return cy.request({
      method: 'GET',
      url: `${buildUrl(API_ENDPOINTS.products)}/${id}`,
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },

  delete(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${buildUrl(API_ENDPOINTS.products)}/${id}`,
      headers: authHeaders(token),
      failOnStatusCode: false,
    });
  },
};
