# AGENTS.md - uiux-base

## Regras do repo

- Trabalhe em portugues por padrao.
- Preserve o objetivo do repo: base neutra e reutilizavel de UI/UX para apps React/Vite.
- Nao edite nenhum arquivo do repo Tatico a partir desta worktree.
- O Tatico pode ser consultado apenas em modo read-only quando for explicitamente necessario extrair padroes.
- Ao consultar o Tatico, use somente docs e frontend como referencia de arquitetura, design system, componentes, features e QA visual. Nao copie dominio, nomes de produto, dados reais, segredos, endpoints, regras de negocio, Supabase, Asaas ou conteudo especifico.
- Nao introduza backend real, auth real, billing real ou integracoes sensiveis sem prompt especifico.
- Nunca exponha segredos em logs, docs, screenshots, commits ou mensagens.

## Desenvolvimento

- Use TDD real quando alterar comportamento React/DOM: teste RED, implementacao minima, GREEN e suite relevante.
- Para frontend JS/TS/React, o bundle padrao de teste e Vitest, jsdom, Testing Library React, jest-dom e user-event, salvo decisao local melhor.
- Prefira componentes acessiveis por roles, labels, teclado e feedback visivel.
- Mantenha `packages/ui` sem regra de negocio.
- Mantenha `packages/app-kit` generico, com shell, guards visuais, hooks, states e templates reutilizaveis.
- Mantenha apps de exemplo com fixtures genericas.

## Validacao

- Antes de editar, revisar `git status --short`, `git diff --stat` e `git diff` do escopo.
- Antes de publicar, repetir `git status --short`, `git diff --stat` e `git diff`.
- Quando scripts existirem, rode lint, testes e build antes de finalizar cada fatia.
- Para mudancas visuais, validar responsividade em 375px, 768px, 1024px e desktop.

## Documentacao

- Atualize `docs/prds/` quando decisoes de escopo, comportamento, arquitetura ou QA mudarem.
- Atualize `docs/prompts/prompts-copiaveis.md` quando o fluxo de prompts mudar.
- Registre riscos e pendencias relevantes no fechamento da sessao.
