import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import { ROUTES, WAIT_TIME } from '../../support/constants';

describe('CT01 - Regressivo da Home', () => {
  beforeEach(() => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    LoginPage.visit();
    LoginPage.login(email, password);

    cy.wait(WAIT_TIME.afterLogin);
    HomePage.shouldBeOnHomePage();
  });

  context('Autenticação e redirecionamento', () => {
    it.only('Deve autenticar e redirecionar para a home administrativa', () => {
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

    it('Deve exibir os botões de todos os cards e navegar corretamente ao clicar', () => {
      HomePage.validateAllCardsNavigation();
    });
  });
});
