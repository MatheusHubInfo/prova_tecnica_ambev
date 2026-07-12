export const API_URL = Cypress.env('apiUrl');

export const ROUTES = {
  login: '/login',
  registerUser: '/cadastrarusuarios',
  home: '/admin/home',
  adminRegisterUsers: '/admin/cadastrarusuarios',
  adminListUsers: '/admin/listarusuarios',
  adminRegisterProducts: '/admin/cadastrarprodutos',
  adminListProducts: '/admin/listarprodutos',
  adminReports: '/admin/relatorios',
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

export const HOME_CONTENT = {
  welcomeTitle: 'Bem Vindo Teste',
  welcomeSubtitle: 'Este é seu sistema para administrar seu ecommerce.',
  navItems: [
    {
      text: 'Home',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(1) > a',
      expectedRoute: ROUTES.home,
    },
    {
      text: 'Cadastrar Usuários',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(2) > a',
      expectedRoute: ROUTES.adminRegisterUsers,
    },
    {
      text: 'Listar Usuários',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(3) > a',
      expectedRoute: ROUTES.adminListUsers,
    },
    {
      text: 'Cadastrar Produtos',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(4) > a',
      expectedRoute: ROUTES.adminRegisterProducts,
    },
    {
      text: 'Listar Produtos',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(5) > a',
      expectedRoute: ROUTES.adminListProducts,
    },
    {
      text: 'Relatórios',
      selector: '#navbarTogglerDemo01 > ul > li:nth-child(6) > a',
      expectedRoute: ROUTES.adminReports,
    },
    {
      text: 'Logout',
      selector: '#navbarTogglerDemo01 > form > button',
      expectedRoute: ROUTES.login,
    },
  ],
  cards: [
    {
      title: 'Cadastrar Usuários',
      description:
        'Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.',
      buttonText: 'Cadastrar',
      buttonSelector: '#root > div > div > p.row > div:nth-child(2) > div > div > a',
      expectedRoute: ROUTES.adminRegisterUsers,
    },
    {
      title: 'Listar Usuários',
      description:
        'Funcionalidade de listagem de usuários que estão cadastrados.',
      buttonText: 'Listar',
      buttonSelector: '#root > div > div > p.row > div:nth-child(3) > div > div > a',
      expectedRoute: ROUTES.adminListUsers,
    },
    {
      title: 'Cadastrar Produtos',
      description:
        'Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.',
      buttonText: 'Cadastrar',
      buttonSelector: '#root > div > div > p.row > div:nth-child(4) > div > div > a',
      expectedRoute: ROUTES.adminRegisterProducts,
    },
    {
      title: 'Listar Produtos',
      description:
        'Funcionalidade de listagem de produtos que estão cadastrados.',
      buttonText: 'Listar',
      buttonSelector: '#root > div > div > p.row > div:nth-child(5) > div > div > a',
      expectedRoute: ROUTES.adminListProducts,
    },
    {
      title: 'Relatórios',
      description:
        'Funcionalidade de relatórios gerais do sistema de ecommerce.',
      buttonText: 'Ver',
      buttonSelector: '#root > div > div > p.row > div:nth-child(6) > div > div > a',
      expectedRoute: ROUTES.adminReports,
    },
  ],
};

export const LOGIN_SELECTORS = {
  email: '#email',
  password: '#password',
  submitButton: '#root > div > div > form > button',
};

export const WAIT_TIME = {
  afterLogin: 2000,
};
