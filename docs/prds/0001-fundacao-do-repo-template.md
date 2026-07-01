# PRD 0001 - Fundacao do Repo Template

**Status:** Proposto
**Depende de:** PRD 0000

## Decisao

Inicializar o `uiux-base` como monorepo com `pnpm workspaces`, TypeScript, Vite,
React, Tailwind, testes e CI desde o primeiro commit.

## Objetivo

Criar uma base tecnica pequena, verificavel e pronta para crescer por pacotes. A
fundacao deve permitir implementar componentes e apps sem retrabalho de
configuracao.

## Estrutura inicial

```text
uiux-base/
  apps/
    starter/
    demo/
  packages/
    ui/
    app-kit/
    config/
  docs/
    prds/
    prompts/
  .github/workflows/
  AGENTS.md
  README.md
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
```

## Stack

- React 18.
- Vite.
- TypeScript.
- Tailwind CSS.
- React Router.
- Vitest.
- jsdom.
- `@testing-library/react`.
- `@testing-library/jest-dom`.
- `@testing-library/user-event`.
- ESLint.

## Escopo

- Criar repo privado no GitHub em `danielriegoor/uiux-base`.
- Criar checkout local em pasta dedicada.
- Copiar as PRDs iniciais para `docs/prds`.
- Copiar prompts para `docs/prompts`.
- Criar `AGENTS.md` proprio do template.
- Criar `README.md` com objetivo e comandos.
- Criar CI para lint, test e build.
- Criar apps vazios mas executaveis.
- Criar packages vazios mas buildaveis.

## AGENTS.md esperado

O `AGENTS.md` do novo repo deve orientar agentes a:

- trabalhar em portugues por padrao;
- usar TDD quando alterar comportamento de UI;
- preservar arquitetura de packages;
- nao introduzir dominio de produto especifico;
- nao expor segredos;
- consultar referencias externas apenas em read-only quando explicitamente necessario;
- validar com lint, testes e build.

## Fora do escopo

- Implementar componentes completos.
- Implementar dashboard real.
- Configurar deploy.
- Publicar pacote.
- Criar backend.
- Criar auth ou billing real.

## Criterios de aceite

- `pnpm install` funciona.
- `pnpm lint` funciona.
- `pnpm test` funciona, ainda que com testes minimos.
- `pnpm build` funciona para apps e packages.
- CI executa no GitHub.
- Nenhum arquivo fora da worktree do template foi editado.
- Repo remoto esta privado.

## Validacoes esperadas

- `git status --short`
- `pnpm install`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `gh repo view danielriegoor/uiux-base`
