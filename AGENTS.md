# AGENTS.md - uiux-base

## Regras do repo

- Trabalhe em portugues por padrao.
- Preserve o objetivo do repo: base neutra e reutilizavel de UI/UX para apps React/Vite.
- Nao edite arquivos fora desta worktree sem instrucao explicita.
- Referencias externas so podem ser consultadas em modo read-only quando o prompt pedir.
- Nao copie dominio, nomes de produto, dados reais, segredos, endpoints, regras de negocio ou conteudo especifico de outro projeto.
- Nao introduza backend real, auth real, billing real ou integracoes sensiveis sem prompt especifico.
- Nunca exponha segredos em logs, docs, screenshots, commits ou mensagens.

## Arquitetura

- Use npm workspaces com apps em `apps/*` e packages em `packages/*`.
- Mantenha `apps/starter` como app base pequeno e executavel.
- Mantenha `apps/demo` como vitrine tecnica das PRDs, sem dados reais.
- Mantenha `packages/ui` focado em primitives e componentes visuais reutilizaveis.
- Mantenha `packages/app-kit` focado em shell, estados, hooks, guards visuais e padroes de app.
- Mantenha `packages/config` para metadados e convencoes compartilhadas.
- Nao crie dependencias circulares entre packages.
- Antes de adicionar abstracoes, confirme que elas reduzem repeticao real ou seguem uma PRD.

## Desenvolvimento

- Use TDD real quando alterar comportamento React/DOM: teste RED, implementacao minima, GREEN e suite relevante.
- Para frontend JS/TS/React, o bundle padrao de teste e Vitest, jsdom, Testing Library React, jest-dom e user-event, salvo decisao local melhor.
- Prefira componentes acessiveis por roles, labels, teclado e feedback visivel.
- Mantenha `packages/ui` sem regra de negocio.
- Mantenha `packages/app-kit` generico, com shell, guards visuais, hooks, states e templates reutilizaveis.
- Mantenha apps de exemplo com fixtures genericas.
- Use React 18, Vite, TypeScript, Tailwind CSS e React Router conforme a fundacao atual.
- Evite landing pages: a primeira tela deve ser uma experiencia de aplicacao.

## Scripts esperados

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run check`

## Validacao

- Antes de editar, revisar `git status --short`, `git diff --stat` e `git diff` do escopo.
- Antes de publicar, repetir `git status --short`, `git diff --stat` e `git diff`.
- Quando scripts existirem, rode lint, testes e build antes de finalizar cada fatia.
- Para mudancas visuais, validar responsividade em 375px, 768px, 1024px e desktop.

## Documentacao

- Atualize `docs/prds/` quando decisoes de escopo, comportamento, arquitetura ou QA mudarem.
- Atualize `docs/prompts/prompts-copiaveis.md` quando o fluxo de prompts mudar.
- Registre riscos e pendencias relevantes no fechamento da sessao.
