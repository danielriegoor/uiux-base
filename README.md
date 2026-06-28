# uiux-base

Template privado e neutro para iniciar apps React/Vite com base reutilizavel de UI, UX, testes e arquitetura de features.

## Objetivo

O `uiux-base` vai servir como monorepo pessoal para projetos front-end data-dense, dashboards internos, prototipos SaaS e apps operacionais. A intencao e consolidar padroes de componentes, layout, estados, acessibilidade e validacao sem carregar dominio de nenhum produto especifico.

## Status atual

A fundacao do monorepo esta configurada:

- Workspaces pnpm em `apps/*` e `packages/*`.
- Apps Vite executaveis em `apps/starter` e `apps/demo`.
- Packages internos buildaveis em `packages/ui`, `packages/app-kit` e `packages/config`.
- React 18, Vite, TypeScript, Tailwind CSS, React Router, Vitest, jsdom, Testing Library, user-event, jest-dom e ESLint.
- CI em GitHub Actions com install, lint, test e build.

## Principios

- Primeira tela dos apps futuros deve ser experiencia de aplicacao, nao landing page.
- Componentes devem ser acessiveis, responsivos e explicitos em loading, empty, error, success e blocked.
- O template deve permanecer neutro: sem Tatico, DinastIA, dados reais, segredos, endpoints reais, Supabase, Asaas, billing real ou auth real.
- Mudancas de comportamento React/DOM devem seguir TDD real.
- Antes de finalizar fatias implementadas, validar com lint, testes e build quando esses scripts existirem.

## Comandos

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

Para desenvolvimento local:

```bash
pnpm --filter starter dev
pnpm --filter demo dev
```

## Estrutura

```text
apps/
  starter/     App base neutro para iniciar produtos.
  demo/        App para demonstrar pacotes e futuras PRDs.
packages/
  ui/          Pacote UI neutro, sem regra de negocio.
  app-kit/     Utilitarios de app e arquitetura reutilizavel.
  config/      Metadados e convencoes compartilhadas.
docs/
  prds/        PRDs do template.
  prompts/     Prompts copiaveis para proximas fatias.
```

## Planejamento

Comece por:

1. `docs/prds/0000-produto-e-escopo.md`
2. `docs/prds/0001-fundacao-do-repo-template.md`
3. `docs/prompts/prompts-copiaveis.md`
4. `docs/estrutura-template.md`
