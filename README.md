# uiux-base

Base publica e reutilizavel de UI/UX para apps React 18 + Vite. O pacote entrega
componentes acessiveis, tokens visuais, estados de interface e um app shell
responsivo sem carregar dominio, backend ou contratos de API.

## Instalar em outro projeto

```bash
npm install uiux-base
```

Importe o CSS uma vez no bootstrap do app:

```tsx
import "uiux-base/styles.css";
```

Depois use o barrel publico:

```tsx
import { Button, DashboardShell, EmptyState, Sidebar } from "uiux-base";
```

O pacote `uiux-base-app-kit` e instalado de forma transitiva. O app consumidor
nao precisa instala-lo diretamente.

## Escopo do MVP

- primitives acessiveis baseadas em Radix UI;
- formularios, feedback, KPI, status e tabela generica;
- shell responsivo com sidebar desktop e drawer mobile;
- tokens CSS com tema claro e escuro via `[data-ui-theme="dark"]` ou `.dark`;
- React Router somente nos apps de exemplo;
- Vitest, jsdom e Testing Library para testes comportamentais;
- pacote ESM com tipos TypeScript e CSS compilado.

Ficam fora do pacote: backend, auth real, billing, cliente HTTP, repository
pattern, espelhos de DTO, Zod por padrao e graficos. Esses itens pertencem ao
produto consumidor e so devem ser adicionados quando houver uma fronteira real.

## Arquitetura recomendada no app consumidor

```text
src/
  pages/        # entradas de rota e orquestracao
  features/     # UI, hooks e helpers de um fluxo
  components/   # componentes compartilhados do produto
  services/     # integracao HTTP pertencente ao produto
  styles/       # CSS Modules locais e overrides de tokens
  test/         # setup compartilhado
```

Paginas orquestram; features concentram comportamento do dominio; componentes
compartilhados nao chamam APIs. CSS Modules ficam locais e os tokens globais
vem do pacote.

## Desenvolvimento deste repo

Requisitos: Node.js 20.19+ e npm 11+.

```bash
npm ci
npm run check
npm run dev --workspace starter
npm run dev --workspace demo
```

O gate `npm run check` executa lint, build dos packages, typecheck, testes,
build dos apps e um smoke que empacota os dois pacotes e os instala em um
consumidor temporario limpo.

## Estrutura

```text
apps/starter        app pequeno para iniciar um produto
apps/demo           vitrine tecnica dos componentes
packages/ui         pacote npm publico uiux-base
packages/app-kit    dependencia npm publica e transitiva
packages/config     convencoes internas do monorepo
docs                uso, arquitetura, QA e decisoes
```

Veja [docs/template-usage.md](docs/template-usage.md) para adocao e
[docs/conventions.md](docs/conventions.md) para as fronteiras arquiteturais.
