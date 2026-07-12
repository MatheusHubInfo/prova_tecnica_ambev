import BasePage from './BasePage';
import { ROUTES } from '../support/constants';

class ReportsPage extends BasePage {
  shouldBeVisible() {
    cy.url().should('include', ROUTES.adminReports);
    cy.contains('h1', 'Em construção aguarde').should('be.visible');
    return this;
  }
}

export default new ReportsPage();
