# Ambev Automation E2E

Projeto de automação de testes com **Cypress** e **JavaScript** para a aplicação [ServeRest](https://serverest.dev/), desenvolvido como prova técnica.

## Aplicações testadas

| Tipo | URL |
|------|-----|
| Frontend | https://front.serverest.dev/ |
| API (Swagger) | https://serverest.dev/ |

## Cenários de teste

### Frontend (E2E) — 3 cenários

| Arquivo | Cenário |
|---------|---------|
| `cypress/e2e/frontend/regressivo-serverest.cy.js` | Login, home, navegação e validação visual das páginas administrativas |
| `cypress/e2e/frontend/cadastro-usuario.cy.js` | Validação dos campos obrigatórios e cadastro de novo usuário |
| `cypress/e2e/frontend/cadastro-produto.cy.js` | Cadastro de produto e validação na listagem |

### API — 3 cenários

| Arquivo | Cenário |
|---------|---------|
| `cypress/e2e/api/login.cy.js` | Autenticação e retorno de token Bearer |
| `cypress/e2e/api/usuarios.cy.js` | Cadastro de usuário via API |
| `cypress/e2e/api/produtos.cy.js` | Cadastro e consulta de produto por ID |

## Arquitetura do projeto

```
├── .github/workflows/        # Pipeline CI com Cypress
├── cypress/
│   ├── e2e/
│   │   ├── api/              # Testes de API (cy.request)
│   │   └── frontend/         # Testes E2E do frontend
│   ├── fixtures/             # Usuário fixo utilizado nos logins
│   ├── pages/                # Page Objects (POM)
│   │   ├── BasePage.js       # Classe base reutilizável
│   │   ├── LoginPage.js
│   │   ├── HomePage.js
│   │   ├── RegisterUserPage.js
│   │   ├── RegisterProductPage.js
│   │   └── ListProductsPage.js
│   ├── services/
│   │   └── api/              # Camada de serviços HTTP
│   └── support/
│       ├── commands.js       # Commands customizados (login, apiLogin)
│       ├── constants.js      # Rotas, mensagens e endpoints
│       └── factories.js      # Geração de dados de teste
├── cypress.config.js
└── package.json
```

## Padrões e boas práticas

| Padrão | Aplicação |
|--------|-----------|
| **Page Object Model (POM)** | Seletores e ações encapsulados em classes de página |
| **Service Layer** | Requisições HTTP centralizadas em `services/api` |
| **Factory Pattern** | Dados dinâmicos gerados via `buildUser()` e `buildProduct()` |
| **Constants** | Rotas, mensagens e endpoints em um único lugar |
| **cy.session** | Reutilização de sessão de login entre testes E2E |
| **Teardown** | Limpeza de dados criados nos testes de API |
| **Variáveis de ambiente** | Credenciais fora do código via `cypress.env.json` |

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [npm](https://www.npmjs.com/)

## Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/MatheusHubInfo/prova_tecnica_ambev.git
cd prova_tecnica_ambev

# 2. Instale as dependências exatamente como definidas no package-lock.json
npm ci
```

Os cenários autenticados utilizam o usuário administrador definido em
`cypress/fixtures/users.json`. Os demais dados criados pelos testes são
dinâmicos e removidos ao final da execução.

### Solução de problemas: executável do Cypress não encontrado

Normalmente, o `npm ci` também baixa o executável do Cypress. Em alguns ambientes, esse download pode não ocorrer ou o cache local pode ter sido removido. Se aparecer a mensagem `Cypress executable not found`, execute:

```bash
# Baixa o executável correspondente à versão instalada no projeto
npx cypress install

# Confirma que a instalação está íntegra
npx cypress verify

# Abre a interface do Cypress
npm run cy:open
```

Se o erro persistir, reinstale as dependências e o executável:

```bash
rm -rf node_modules
npm ci
npx cypress install
npx cypress verify
```

## Executando os testes

```bash
# Interface interativa do Cypress
npm run cy:open

# Todos os testes (headless)
npm run test

# Apenas frontend E2E
npm run test:e2e

# Apenas API
npm run test:api

# Com browser visível
npm run test:headed
```

## CI/CD (GitHub Actions)

O pipeline executa automaticamente em push/PR na branch `main`.
O usuário de login está definido na fixture do projeto, sem configuração de secrets.

## Tecnologias

- [Cypress](https://www.cypress.io/) v13
- JavaScript (ES Modules)
- [ServeRest](https://serverest.dev/) — API e frontend de estudo

## Repositório

https://github.com/MatheusHubInfo/prova_tecnica_ambev

## Autor

Matheus — Prova Técnica Ambev
