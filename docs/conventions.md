# Convencoes

## Fronteiras

- `packages/ui`: primitives e componentes visuais reutilizaveis.
- `packages/app-kit`: shell, navegacao, hooks e estados genericos.
- `apps/starter`: experiencia de aplicacao pequena e copiavel.
- `apps/demo`: vitrine tecnica, sem dados reais.
- `packages/config`: metadados internos do monorepo.

Paginas do produto orquestram. Features implementam um fluxo. Componentes
compartilhados nao acessam API. Integracoes e contratos do backend ficam no app
consumidor, nunca na biblioteca visual.

## Dependencias

- npm workspaces e um unico `package-lock.json`;
- React 18 e React DOM como peer dependencies dos packages publicos;
- imports de consumidores usam `uiux-base`;
- nao usar import profundo de `src`;
- nao criar dependencia circular entre `ui` e `app-kit`;
- adicionar abstracao somente quando ela reduz repeticao real.

## Estilos

- tokens globais usam o prefixo `--ui-`;
- componentes do package consomem tokens sem fixar a marca do produto;
- CSS Modules pertencem a paginas/features do consumidor;
- Tailwind organiza composicao dos componentes da biblioteca;
- alvos interativos principais mantem pelo menos 44px;
- foco visivel, teclado, contraste e reduced motion sao requisitos.

## Contratos

- props e tipos de navegacao fazem parte da API visual;
- Zod nao e dependencia padrao do template;
- schema de runtime so entra em fronteira nao confiavel comprovada;
- nao espelhar DTOs do backend por antecipacao;
- nao criar cliente HTTP ou repository pattern dentro dos packages.

## Testes

Mudanca observavel React/DOM segue RED, implementacao minima e GREEN. Priorize
`getByRole`, `getByLabelText` e `userEvent`. Evite snapshots grandes e asserts de
classe sem valor para o usuario.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
```

## Neutralidade

Nao versionar dados reais, credenciais, endpoints privados, regras de negocio,
nomes de produtos consumidores ou payloads de provedores.
