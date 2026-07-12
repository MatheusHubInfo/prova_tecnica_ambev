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
    return cy.get(`[data-test="${selector}"]`);
  }

  shouldShowAlertWith(message) {
    this.getByTestId('alert')
      .should('be.visible')
      .and('contain.text', message);
    return this;
  }
}
