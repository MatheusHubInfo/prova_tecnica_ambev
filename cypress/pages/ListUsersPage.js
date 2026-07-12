import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class ListUsersPage extends BasePage {
  shouldBeVisible() {
    cy.url().should('include', ROUTES.adminListUsers);
    cy.contains('h1', 'Lista dos usuários').should('be.visible');
    cy.get('table').should('be.visible');
    return this;
  }
}

export default new ListUsersPage();
