import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import RegisterUserPage from '../../pages/RegisterUserPage';
import ListUsersPage from '../../pages/ListUsersPage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';
import ReportsPage from '../../pages/ReportsPage';
import { ROUTES, HOME_CONTENT } from '../../support/constants';

describe('CT01 - Regressivo da Home', () => {
  let adminUser;

  before(() => {
    return cy.createAdminUser().then((user) => {
      adminUser = user;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(adminUser.email, adminUser.password);

    HomePage.shouldBeOnHomePage();
    HomePage.shouldBeVisible();
  });

  after(() => {
    if (!adminUser) return;
    return cy.deleteUser(adminUser._id);
  });

  context('Autenticação e redirecionamento', () => {
    it('Deve autenticar e redirecionar para a home administrativa', () => {
      cy.url().should('include', ROUTES.home);
      HomePage.shouldBeVisible();
    });
  });

  context('Barra de navegação superior', () => {
    it('Deve exibir todos os links de navegação pelo texto e seletor', () => {
      HomePage.validateNavLinks();
    });

    it('Deve navegar corretamente ao clicar nos links do menu superior', () => {
      HomePage.validateNavNavigation();
    });

    it('Deve realizar logout ao clicar no botão Logout do menu superior', () => {
      HomePage.validateLogoutNavigation();
    });
  });

  context('Mensagem de boas-vindas', () => {
    it('Deve exibir o título e subtítulo da home', () => {
      HomePage.validateWelcomeSection();
    });
  });

  context('Cards de funcionalidades', () => {
    const [
      registerUsersCard,
      listUsersCard,
      registerProductsCard,
      listProductsCard,
      reportsCard,
    ] = HOME_CONTENT.cards;

    it('Deve exibir o texto de todos os cards da home', () => {
      HomePage.validateAllCardsContent();
    });

    it('Deve acessar a página de cadastro de usuários pelo card', () => {
      HomePage.clickCardButton(registerUsersCard);
      RegisterUserPage.shouldShowAdminForm();
    });

    it('Deve acessar a página de listagem de usuários pelo card', () => {
      HomePage.clickCardButton(listUsersCard);
      ListUsersPage.shouldBeVisible();
    });

    it('Deve acessar a página de cadastro de produtos pelo card', () => {
      HomePage.clickCardButton(registerProductsCard);
      RegisterProductPage.shouldShowForm();
    });

    it('Deve acessar a página de listagem de produtos pelo card', () => {
      HomePage.clickCardButton(listProductsCard);
      ListProductsPage.shouldBeVisible();
    });

    it('Deve acessar a página de relatórios pelo card', () => {
      HomePage.clickCardButton(reportsCard);
      ReportsPage.shouldBeVisible();
    });
  });
});
