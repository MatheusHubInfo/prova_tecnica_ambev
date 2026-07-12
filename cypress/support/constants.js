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
  deleteSuccess: 'Registro excluído com sucesso',
};

export const API_ENDPOINTS = {
  login: '/login',
  users: '/usuarios',
  products: '/produtos',
};

export const HOME_CONTENT = {
  welcomeTitle: 'Bem Vindo',
  welcomeSubtitle: 'Este é seu sistema para administrar seu ecommerce.',
  navItems: [
    {
      text: 'Home',
      selector: '[data-testid="home"]',
      expectedRoute: ROUTES.home,
    },
    {
      text: 'Cadastrar Usuários',
      selector: '[data-testid="cadastrar-usuarios"]',
      expectedRoute: ROUTES.adminRegisterUsers,
    },
    {
      text: 'Listar Usuários',
      selector: '[data-testid="listar-usuarios"]',
      expectedRoute: ROUTES.adminListUsers,
    },
    {
      text: 'Cadastrar Produtos',
      selector: '[data-testid="cadastrar-produtos"]',
      expectedRoute: ROUTES.adminRegisterProducts,
    },
    {
      text: 'Listar Produtos',
      selector: '[data-testid="listar-produtos"]',
      expectedRoute: ROUTES.adminListProducts,
    },
    {
      text: 'Relatórios',
      selector: '[data-testid="link-relatorios"]',
      expectedRoute: ROUTES.adminReports,
    },
    {
      text: 'Logout',
      selector: '[data-testid="logout"]',
      expectedRoute: ROUTES.login,
    },
  ],
  cards: [
    {
      title: 'Cadastrar Usuários',
      description:
        'Funcionalidade de cadastro de usuários para ter acesso ao ecommerce.',
      buttonText: 'Cadastrar',
      buttonSelector: '[data-testid="cadastrarUsuarios"]',
      expectedRoute: ROUTES.adminRegisterUsers,
    },
    {
      title: 'Listar Usuários',
      description:
        'Funcionalidade de listagem de usuários que estão cadastrados.',
      buttonText: 'Listar',
      buttonSelector: '[data-testid="listarUsuarios"]',
      expectedRoute: ROUTES.adminListUsers,
    },
    {
      title: 'Cadastrar Produtos',
      description:
        'Funcionalidade de cadastro de produtos para ser utilizado no ecommerce.',
      buttonText: 'Cadastrar',
      buttonSelector: '[data-testid="cadastrarProdutos"]',
      expectedRoute: ROUTES.adminRegisterProducts,
    },
    {
      title: 'Listar Produtos',
      description:
        'Funcionalidade de listagem de produtos que estão cadastrados.',
      buttonText: 'Listar',
      buttonSelector: '[data-testid="listarProdutos"]',
      expectedRoute: ROUTES.adminListProducts,
    },
    {
      title: 'Relatórios',
      description:
        'Funcionalidade de relatórios gerais do sistema de ecommerce.',
      buttonText: 'Ver',
      buttonSelector: '[data-testid="relatorios"]',
      expectedRoute: ROUTES.adminReports,
    },
  ],
};

export const LOGIN_SELECTORS = {
  email: '[data-testid="email"]',
  password: '[data-testid="senha"]',
  submitButton: '[data-testid="entrar"]',
};
