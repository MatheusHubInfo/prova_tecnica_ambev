/**
 * Gera dados de usuário únicos para evitar conflito de e-mail nos cadastros.
 */
export function buildUser(overrides = {}) {
  const timestamp = Date.now();

  return {
    nome: 'Usuario Automacao',
    email: `usuario.teste.${timestamp}@serverest.dev`,
    password: 'senha123',
    administrador: false,
    ...overrides,
  };
}

/**
 * Gera dados de produto únicos para os cenários de cadastro.
 */
export function buildProduct(overrides = {}) {
  const timestamp = Date.now();

  return {
    nome: `Produto Automacao ${timestamp}`,
    preco: 1999,
    descricao: 'Produto criado via automação Cypress',
    quantidade: 10,
    ...overrides,
  };
}
