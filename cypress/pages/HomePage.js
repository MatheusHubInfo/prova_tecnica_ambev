import BasePage from './BasePage';
import { ROUTES, HOME_CONTENT } from '../support/constants';

class HomePage extends BasePage {
  elements = {
    homeTitle: () => cy.get('.jumbotron h1'),
    navHome: () => cy.get(HOME_CONTENT.navItems[0].selector),
    navRegisterUsers: () => cy.get(HOME_CONTENT.navItems[1].selector),
    navListUsers: () => cy.get(HOME_CONTENT.navItems[2].selector),
    navRegisterProducts: () => cy.get(HOME_CONTENT.navItems[3].selector),
    navListProducts: () => cy.get(HOME_CONTENT.navItems[4].selector),
    navReports: () => cy.get(HOME_CONTENT.navItems[5].selector),
    navLogout: () => cy.get(HOME_CONTENT.navItems[6].selector),
  };

  visit() {
    super.visit(ROUTES.home);
    return this;
  }

  shouldBeVisible() {
    this.elements
      .homeTitle()
      .should('be.visible')
      .and('contain.text', 'Bem Vindo');
    return this;
  }

  shouldBeOnHomePage() {
    cy.url().should('include', ROUTES.home);
    return this;
  }

  validateNavItem(navItem) {
    cy.get(navItem.selector)
      .should('be.visible')
      .and('contain.text', navItem.text);
    return this;
  }

  validateNavLinks() {
    HOME_CONTENT.navItems.forEach((navItem) => {
      this.validateNavItem(navItem);
    });
    return this;
  }

  validateNavNavigation() {
    HOME_CONTENT.navItems
      .filter((navItem) => !['Home', 'Logout'].includes(navItem.text))
      .forEach((navItem) => {
        cy.get(navItem.selector).should('be.visible').click();
        cy.url().should('include', navItem.expectedRoute);
        this.visit();
        this.shouldBeOnHomePage();
      });
    return this;
  }

  validateLogoutNavigation() {
    const logoutItem = HOME_CONTENT.navItems.find(
      (navItem) => navItem.text === 'Logout',
    );

    cy.get(logoutItem.selector)
      .should('be.visible')
      .and('contain.text', logoutItem.text)
      .click();

    cy.url().should('include', logoutItem.expectedRoute);
    return this;
  }

  validateWelcomeSection() {
    cy.contains(HOME_CONTENT.welcomeTitle).should('be.visible');
    cy.contains(HOME_CONTENT.welcomeSubtitle).should('be.visible');
    return this;
  }

  validateCardContent(card) {
    cy.contains(card.title).should('be.visible');
    cy.contains(card.description).should('be.visible');
    cy.get(card.buttonSelector)
      .should('be.visible')
      .and('contain.text', card.buttonText);
    return this;
  }

  validateAllCardsContent() {
    HOME_CONTENT.cards.forEach((card) => {
      this.validateCardContent(card);
    });
    return this;
  }

  clickCardButton(card) {
    cy.get(card.buttonSelector).should('be.visible').click();
    return this;
  }

  validateCardNavigation(card) {
    this.clickCardButton(card);
    cy.url().should('include', card.expectedRoute);
    this.visit();
    this.shouldBeOnHomePage();
    return this;
  }

  validateAllCardsNavigation() {
    HOME_CONTENT.cards.forEach((card) => {
      this.validateCardNavigation(card);
    });
    return this;
  }

  logout() {
    this.elements.navLogout().click();
    return this;
  }

  goToRegisterProducts() {
    this.elements.navRegisterProducts().click();
    return this;
  }

  goToListProducts() {
    this.elements.navListProducts().click();
    return this;
  }

  goToRegisterUsers() {
    this.elements.navRegisterUsers().click();
    return this;
  }
}

export default new HomePage();
