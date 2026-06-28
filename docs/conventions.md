# Convencoes

## Workspace

- O monorepo usa pnpm workspaces com apps em `apps/*` e packages em `packages/*`.
- Apps executaveis ficam em `apps/starter` e `apps/demo`.
- Packages internos ficam em `packages/ui`, `packages/app-kit` e `packages/config`.
- Imports entre workspaces devem usar nomes de pacote, por exemplo `@uiux-base/ui`.
- Packages devem permanecer neutros e sem regra de negocio de produto especifico.

## Scripts

Todos os scripts principais rodam a partir da raiz:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Use filtros do pnpm quando precisar validar uma parte especifica:

```bash
pnpm --filter starter test
pnpm --filter demo build
pnpm --filter @uiux-base/ui build
```

## React e testes

- Mudancas de comportamento React/DOM devem seguir TDD real: RED, GREEN e validacao relevante.
- Testes devem priorizar comportamento e acessibilidade com Testing Library.
- Prefira `getByRole`, `getByLabelText` e interacoes com `userEvent`.
- Evite snapshots grandes, seletores por classe CSS e testes acoplados a detalhes internos.

## UX e acessibilidade

- A primeira tela deve ser uma experiencia de aplicacao, nao landing page.
- Interfaces operacionais devem ser claras, densas e escaneaveis.
- Todo controle interativo precisa ter nome acessivel.
- Estados loading, empty, error, success e blocked devem ser explicitos quando existirem.
- Textos e layouts devem ser validados para 375px, 768px, 1024px e desktop largo quando houver mudanca visual relevante.

## CSS e Tailwind

- Apps usam Tailwind CSS via Vite.
- Estilos globais ficam em `src/index.css` de cada app.
- Packages podem exportar componentes com classes Tailwind, mas nao devem depender de tema de dominio.
- Evite paletas acopladas a um produto especifico; use tokens neutros ate a PRD de design system definir a base visual.

## Neutralidade

- Nao introduza Tatico, DinastIA, dados reais, endpoints reais, Supabase, Asaas, auth real, billing real ou backend real sem PRD especifica.
- O Tatico pode ser consultado apenas como referencia read-only quando o prompt permitir.
- Documentos e exemplos devem usar linguagem generica de app, workspace, registros, analytics, configuracoes e estados.
