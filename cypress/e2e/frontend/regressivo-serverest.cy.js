import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import RegisterUserPage from '../../pages/RegisterUserPage';
import ListUsersPage from '../../pages/ListUsersPage';
import RegisterProductPage from '../../pages/RegisterProductPage';
import ListProductsPage from '../../pages/ListProductsPage';
import ReportsPage from '../../pages/ReportsPage';
import { ROUTES, HOME_CONTENT } from '../../support/constants';
import users from '../../fixtures/users.json';

describe('CT01 - Regressivo da Home', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(users.adminUser.email, users.adminUser.password);

    HomePage.shouldBeOnHomePage();
    HomePage.shouldBeVisible();
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
    it('Deve exibir o texto de todos os cards da home', () => {
      HomePage.validateAllCardsContent();
    });

    it('Deve validar as páginas acessadas pelos botões dos cards', () => {
      const [
        registerUsersCard,
        listUsersCard,
        registerProductsCard,
        listProductsCard,
        reportsCard,
      ] = HOME_CONTENT.cards;

      HomePage.clickCardButton(registerUsersCard);
      RegisterUserPage.shouldShowAdminForm();
      HomePage.visit();

      HomePage.clickCardButton(listUsersCard);
      ListUsersPage.shouldBeVisible();
      HomePage.visit();

      HomePage.clickCardButton(registerProductsCard);
      RegisterProductPage.shouldShowForm();
      HomePage.visit();

      HomePage.clickCardButton(listProductsCard);
      ListProductsPage.shouldBeVisible();
      HomePage.visit();

      HomePage.clickCardButton(reportsCard);
      ReportsPage.shouldBeVisible();
    });
  });
});
