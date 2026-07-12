export const API_URL = Cypress.env('apiUrl');

export const ROUTES = {
  login: '/',
  registerUser: '/cadastrarusuarios',
  home: '/admin/home',
  registerProduct: '/admin/cadastrarprodutos',
  listProducts: '/admin/listarprodutos',
};

export const MESSAGES = {
  registerSuccess: 'Cadastro realizado com sucesso',
  loginSuccess: 'Login realizado com sucesso',
};

export const API_ENDPOINTS = {
  login: '/login',
  users: '/usuarios',
  products: '/produtos',
};
