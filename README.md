# Ambev Automation E2E

Projeto de automação de testes com **Cypress** para a aplicação [Serverest](https://serverest.dev/), desenvolvido como parte da prova técnica.

## Aplicações testadas

| Tipo | URL |
|------|-----|
| Frontend | https://front.serverest.dev/ |
| API (Swagger) | https://serverest.dev/ |

## Cenários de teste

### Frontend (E2E) — 3 cenários

| Arquivo | Cenário |
|---------|---------|
| `cypress/e2e/frontend/login.cy.js` | Login com credenciais válidas |
| `cypress/e2e/frontend/cadastro-usuario.cy.js` | Cadastro de novo usuário |
| `cypress/e2e/frontend/cadastro-produto.cy.js` | Cadastro de produto autenticado |

### API — 3 cenários

| Arquivo | Cenário |
|---------|---------|
| `cypress/e2e/api/usuarios.cy.js` | Cadastro de usuário via API |
| `cypress/e2e/api/login.cy.js` | Autenticação e retorno de token |
| `cypress/e2e/api/produtos.cy.js` | Cadastro e consulta de produto via API |

## Estrutura do projeto

```
├── cypress/
│   ├── e2e/
│   │   ├── api/              # Testes de API
│   │   └── frontend/         # Testes E2E do frontend
│   ├── fixtures/             # Dados de teste reutilizáveis
│   ├── pages/                # Page Objects (POM)
│   ├── services/             # Camada de serviços da API
│   └── support/              # Commands customizados e configurações
├── cypress.config.js
├── cypress.env.example.json  # Modelo de variáveis de ambiente
└── package.json
```

## Padrões adotados

- **Page Object Model (POM)** — encapsulamento de seletores e ações das páginas
- **Separação de responsabilidades** — testes, pages, services e fixtures em camadas distintas
- **Dados dinâmicos** — e-mails únicos gerados em tempo de execução para evitar conflitos
- **Limpeza de dados** — exclusão de registros criados nos testes de API (teardown)
- **Variáveis de ambiente** — credenciais fora do código-fonte via `cypress.env.json`

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/)

## Configuração

1. Clone o repositório:

```bash
git clone https://github.com/MatheusHubInfo/prova_tecnica_ambev.git
cd prova_tecnica_ambev
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as credenciais:

```bash
cp cypress.env.example.json cypress.env.json
```

Edite o `cypress.env.json` com seu e-mail e senha do Serverest:

```json
{
  "userEmail": "seu-email@exemplo.com",
  "userPassword": "sua-senha"
}
```

## Executando os testes

```bash
# Abrir interface interativa do Cypress
npm run cy:open

# Executar todos os testes (headless)
npm run test

# Executar apenas testes E2E do frontend
npm run test:e2e

# Executar apenas testes de API
npm run test:api
```

## Tecnologias

- [Cypress](https://www.cypress.io/) v13
- JavaScript (ES Modules)

## Autor

Matheus — Prova Técnica Ambev
