/**
 * Classe base para Page Objects.
 * Centraliza interações comuns e mantém o padrão fluente (method chaining).
 */
export default class BasePage {
  visit(path) {
    cy.visit(path);
    return this;
  }

  getByTestId(selector) {
    return cy.get(`[data-testid="${selector}"]`);
  }

  shouldShowAlertWith(message) {
    cy.contains(message).should('be.visible');
    return this;
  }
}
