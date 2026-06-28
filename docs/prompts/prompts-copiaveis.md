# Prompts copiaveis - uiux-base

Use estes prompts em sessoes futuras do Codex para criar e implementar o repo privado `danielriegoor/uiux-base`.

## Contexto fixo para qualquer sessao

```text
Voce esta trabalhando no projeto uiux-base, repo privado pessoal em github.com/danielriegoor/uiux-base.

Fonte local de planejamento:
G:/templates/ui-ux

Regras:
- Trabalhe em portugues por padrao.
- Nao edite nenhum arquivo do repo Tatico.
- Pode consultar o Tatico em modo read-only quando for necessario extrair padroes.
- Ao consultar o Tatico, use principalmente docs/prds/ux/001-020, ux-qa-matrix.md, prompts-ui-011-019.md, frontend/src/components, frontend/src/features e frontend/src/pages/dashboard apenas para entender padroes.
- Nao copie dominio Tatico, nomes de produto, dados reais, segredos, endpoints reais, Supabase/Asaas especificos ou regras de benchmarking/construcao civil.
- Crie uma base neutra e reutilizavel.
- Use TDD real quando alterar comportamento React/DOM.
- Rode lint, testes e build antes de finalizar cada fatia.
```

## Fluxo Git e Review
```text
- Verifique diffs sempre: antes de editar, antes de testar, antes de `git add`, antes de abrir PR e antes de mergear, rode `git status --short`, `git diff --stat` e `git diff` do escopo.
- Use `gh` CLI para consultar branches, PRs, checks e abrir/atualizar PRs.
- Confira worktrees locais e no GitHub antes de iniciar: `git worktree list`, status em cada worktree relacionada e PRs/branches remotas da feature.
- Crie ou atualize as PRs necessarias contra `main`.
- Use $code-reviewer para revisar a PR/diff; corrija achados, revalide e atualize a PR.
- Depois de aprovado, faca merge quando o fluxo da sessao permitir, atualize `main` local e limpe worktrees/branches locais/remotas que estiverem integradas com seguranca.
```

## Skills e Subagents
```text
- use $superpowers para entender o escopo de cada prompt, suas regras e fluxo.
- uso de subagents liberado
- Use $code-reviewer para revisar a PR/diff; corrija achados, revalide e atualize a PR.
```

## Prompt 00 - Criar repo privado e importar planejamento

```text
Crie o repo privado github.com/danielriegoor/uiux-base fora do Tatico.

Use como fonte local:
G:/templates/ui-ux

Escopo:
- Criar checkout local do novo repo em uma pasta fora de G:/DinastIA/tatico.
- Confirmar que o remoto sera pessoal e privado: danielriegoor/uiux-base.
- Copiar as PRDs de G:/templates/ui-ux/prds para docs/prds no novo repo.
- Copiar G:/templates/ui-ux/prompts/prompts-copiaveis.md para docs/prompts/prompts-copiaveis.md.
- Criar README.md inicial com objetivo do template.
- Criar AGENTS.md inicial com regras do repo.
- Criar estrutura vazia planejada em docs, mas sem implementar ainda os packages.
- Fazer commit inicial e push para main.

Fora do escopo:
- Nao implementar componentes.
- Nao configurar app completo ainda.
- Nao editar Tatico.

Validacoes:
- gh repo view danielriegoor/uiux-base
- git status --short
- conferir que o repo remoto e privado.
```

## Prompt 01 - Fundacao do monorepo

```text
Implemente a PRD 0001 - Fundacao do Repo Template no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0000-produto-e-escopo.md.
- Leia docs/prds/0001-fundacao-do-repo-template.md.
- Leia docs/prompts/prompts-copiaveis.md.

Escopo:
- Inicializar pnpm workspaces.
- Criar apps/starter, apps/demo, packages/ui, packages/app-kit e packages/config.
- Configurar React 18, Vite, TypeScript, Tailwind, Vitest, jsdom, Testing Library, user-event, jest-dom, React Router e ESLint.
- Criar scripts root: lint, test, build, typecheck e check.
- Criar CI com lint, test e build.
- Criar AGENTS.md final do repo.
- Criar docs/conventions.md inicial.

Fora do escopo:
- Nao implementar design system completo.
- Nao implementar DataTable, ChartPanel ou DashboardShell completo.
- Nao criar backend, auth real, billing real, Supabase ou Asaas.
- Nao editar Tatico.

Validacoes:
- pnpm install
- pnpm lint
- pnpm test
- pnpm build
- git status --short
- commit e push.
```

## Prompt 02 - Design system e UI package

```text
Implemente a PRD 0002 - Design System e UI Package no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0002-design-system-e-ui-package.md.
- Consulte o Tatico em read-only somente se precisar comparar padroes de UI primitives e estados.

Escopo:
- Criar packages/ui com exports organizados.
- Criar cn, tokens iniciais e globals.
- Criar Button, Input, Textarea, Select, Checkbox, Dialog, DropdownMenu, Tabs, Tooltip e Skeleton.
- Criar EmptyState, ErrorState, LoadingState, BlockedState e ToastProvider com Sonner.
- Criar FieldGroup, FormSection e SubmitBar.
- Criar KpiCard e StatusBadge simples.
- Criar exemplos no apps/demo.
- Criar testes comportamentais quando houver interacao.

Fora do escopo:
- Nao criar DataTable completo.
- Nao criar ChartPanel completo.
- Nao criar DashboardShell completo.
- Nao criar regra de negocio ou API real.

Validacoes:
- pnpm --filter @uiux-base/ui test
- pnpm --filter @uiux-base/ui build
- pnpm --filter demo build
- pnpm test
- pnpm build
- commit e push.
```

## Prompt 03 - App kit e arquitetura de features

```text
Implemente a PRD 0003 - App Kit e Arquitetura de Features no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0003-app-kit-e-arquitetura-de-features.md.
- Consulte o Tatico em read-only somente se precisar entender padrao de shell, guards ou features.

Escopo:
- Criar packages/app-kit.
- Criar DashboardShell, DashboardContent, Sidebar, Topbar e StatusBar.
- Criar GuardNotice, RequireAccess, WorkspaceStateNotice e AppStateBoundary.
- Criar apiClient leve, createMockClient, useAsyncState e useDisclosure.
- Criar feature-template documentado.
- Integrar o shell no apps/starter.
- Garantir primeira tela como experiencia de app, nao landing page.

Fora do escopo:
- Nao criar auth real.
- Nao criar backend real.
- Nao criar repository pattern.
- Nao copiar regras do Tatico.

Validacoes:
- testes de shell e guards quando viavel.
- pnpm test
- pnpm build
- smoke visual em 375px, 768px, 1024px e desktop.
- commit e push.
```

## Prompt 04 - Data display, tabelas e graficos

```text
Implemente a PRD 0004 - Data Display, Tabelas e Graficos no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0004-data-display-tabelas-e-graficos.md.
- Consulte o Tatico em read-only somente se precisar entender DataTable, ChartPanel, estados ou matriz QA.

Escopo:
- Criar DataTable com TanStack Table.
- Criar DataTableToolbar, DataTablePagination e DataTableEmptyState.
- Criar ChartPanel com Recharts.
- Criar ChartTooltip e chart tokens.
- Integrar exemplos no apps/demo e apps/starter.
- Cobrir loading, empty, error, success e dense data.
- Garantir labels/roles acessiveis.

Fora do escopo:
- Nao implementar server-side pagination obrigatoria.
- Nao criar export PDF/CSV.
- Nao criar graficos de dominio especifico.

Validacoes:
- testes de DataTable.
- testes de ChartPanel.
- pnpm test
- pnpm build
- smoke visual mobile e desktop.
- commit e push.
```

## Prompt 05 - Starter e demo apps

```text
Implemente a PRD 0005 - Starter e Demo Apps no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0005-starter-e-demo-apps.md.

Escopo:
- Completar apps/starter com rotas genericas: dashboard, overview, records, analytics e settings.
- Completar apps/demo com paginas de componentes, feedback, forms, data-table, charts, dashboard-shell e states.
- Criar fixtures genericas sem dominio Tatico.
- Documentar como trocar fixtures por API real.
- Validar responsividade.

Fora do escopo:
- Nao criar landing page.
- Nao criar auth real.
- Nao criar backend real.
- Nao usar dados Tatico.

Validacoes:
- pnpm --filter starter build
- pnpm --filter demo build
- pnpm test
- pnpm build
- smoke visual das rotas principais.
- commit e push.
```

## Prompt 06 - QA, readiness e GitHub Template

```text
Implemente a PRD 0006 - QA, Readiness e Documentacao do Template no repo danielriegoor/uiux-base.

Antes de editar:
- Leia docs/prds/0006-qa-readiness-e-documentacao.md.

Escopo:
- Criar docs/template-usage.md.
- Criar docs/conventions.md final.
- Criar docs/qa-matrix.md.
- Atualizar docs/prompts/prompts-copiaveis.md se necessario.
- Validar starter e demo em 375px, 768px, 1024px e desktop.
- Buscar acoplamentos proibidos: Tatico, DinastIA, Asaas, Supabase, benchmarking, construcao, obra, orcamento.
- Confirmar CI verde.
- Orientar como marcar o repo como Template repository no GitHub.

Fora do escopo:
- Nao publicar npm.
- Nao tornar repo publico.
- Nao implementar backend/deploy.

Validacoes:
- pnpm lint
- pnpm test
- pnpm build
- smoke visual final.
- gh run list
- commit e push.
```
