# Convencoes

Este documento define o contrato final do template. O objetivo e permitir que
humanos e agentes criem novos apps sem misturar regra de produto com componentes
reutilizaveis.

## Workspace

- O monorepo usa pnpm workspaces.
- Apps executaveis ficam em `apps/*`.
- Packages internos ficam em `packages/*`.
- `apps/starter` e o app base para novos produtos.
- `apps/demo` e a vitrine tecnica dos componentes e padroes.
- Imports entre workspaces usam nomes de pacote, por exemplo `@uiux-base/ui`.
- Evite imports profundos a partir dos apps; prefira exports publicos.

## Limites entre apps e packages

`packages/ui`:

- componentes visuais, primitives, feedback, forms e data display;
- tokens e helpers de classe;
- sem chamadas HTTP, dados reais, auth, billing ou regra de produto.

`packages/app-kit`:

- shell, layout, guards visuais, estados de workspace, hooks e templates de
  feature;
- clients leves e substituiveis para exemplos;
- sem dependencia em um provedor real.

`packages/config`:

- metadados compartilhados do workspace;
- convencoes estaveis que podem ser consumidas por apps.

`apps/*`:

- rotas, composicao de tela, fixtures e integracao com API do produto consumidor;
- textos de marca do projeto criado a partir do template;
- testes de fluxos especificos do app.

## Arquitetura de features

Use features pequenas e coesas. Um novo app pode seguir este desenho:

```text
src/features/records/
  api.ts
  types.ts
  schemas.ts
  hooks.ts
  components/
  README.md
```

Regras:

- `api.ts` traduz a origem externa para tipos locais.
- `types.ts` define contratos consumidos pela UI.
- `schemas.ts` valida entrada quando houver formulario.
- `hooks.ts` coordena loading, error e action pending.
- `components/` renderiza UI sem conhecer detalhes de transporte.
- Evite arquivos gigantes; se uma tela crescer demais, extraia secoes locais.

## Componentes

- Componentes interativos precisam de nome acessivel.
- Botao icon-only deve receber `aria-label`.
- Inputs precisam de `label`, `aria-label` ou associacao via `FieldGroup`.
- Estados loading devem usar `role="status"` quando aplicavel.
- Estados de erro devem usar `role="alert"` quando aplicavel.
- Estados empty, blocked e readonly precisam de texto claro e acao coerente.
- Tabelas densas devem preservar header, paginacao e overflow horizontal
  intencional dentro do proprio componente.
- Graficos devem ter titulo, descricao, legenda textual ou sumario acessivel.

## UX e responsividade

- A primeira tela deve ser experiencia de app, nao landing page.
- Interfaces operacionais devem ser densas, claras e escaneaveis.
- Textos precisam caber no container em 375px, 768px, 1024px e desktop largo.
- Foco visivel e ordem de tabulacao fazem parte do aceite visual.
- Nao use dados reais, endpoints privados, segredos ou nomes de dominio externo
  em fixtures, screenshots, docs ou commits.

## React e testes

- Mudancas de comportamento React/DOM devem seguir RED, GREEN e validacao
  relevante.
- Use Vitest, jsdom, Testing Library, jest-dom e user-event.
- Priorize `getByRole`, `getByLabelText` e interacoes reais.
- Evite snapshots grandes, seletores por classe CSS e testes acoplados a detalhes
  internos.
- Ao alterar componentes compartilhados, rode testes do package e da suite raiz.

## Scripts

Scripts principais na raiz:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Filtros uteis:

```bash
pnpm --filter starter test
pnpm --filter demo build
pnpm --filter @uiux-base/ui build
```

## Neutralidade

- Mantenha o template livre de dados reais, provedores reais, endpoints privados
  e termos de dominio externo.
- Use nomes como workspace, registro, projeto, evento, metrica, usuario e
  organizacao.
- Se um projeto consumidor precisar de auth, billing, backend ou persistencia
  real, trate como escopo do projeto consumidor, nao como padrao do template.
