# PRD 0006 - QA, Readiness e Documentacao do Template

**Status:** Proposto
**Depende de:** PRDs 0001-0005

## Decisao

Antes de marcar o repo como GitHub Template, criar uma matriz de QA e
documentacao suficiente para reutilizacao por humanos e agentes.

## Objetivo

Garantir que o template esta pronto para ser usado em projetos futuros sem
depender da memoria da sessao original.

## Documentos obrigatorios

```text
docs/
  template-usage.md
  conventions.md
  qa-matrix.md
  prompts/
    prompts-copiaveis.md
```

## Escopo

- Documentar como usar "Use this template" no GitHub.
- Documentar como renomear app/package.
- Documentar como trocar fixtures por API real.
- Documentar convencoes de componentes.
- Documentar arquitetura de features.
- Documentar criterios de acessibilidade basica.
- Criar matriz QA por rotas, estados e viewports.
- Validar starter e demo.
- Revisar neutralidade dos nomes.

## Matriz QA minima

Viewports:

- 375px.
- 768px.
- 1024px.
- Desktop largo.

Estados:

- loading;
- empty;
- error;
- success;
- blocked;
- dense data;
- readonly;
- action pending.

Checagens:

- sem overflow horizontal acidental;
- foco visivel;
- tab order coerente;
- botoes icon-only com `aria-label`;
- inputs com label ou `aria-label`;
- loading com `role="status"` quando aplicavel;
- error com `role="alert"` quando aplicavel;
- textos cabem em seus containers.

## Fora do escopo

- Polish visual avancado.
- Publicacao npm.
- Deploy em producao.
- E2E completo com backend real.

## Criterios de aceite

- `docs/template-usage.md` permite criar um novo app a partir do repo.
- `docs/conventions.md` explica limites entre packages e apps.
- `docs/qa-matrix.md` registra rotas, estados e viewports.
- CI esta verde.
- Nao ha referencias a produtos privados, provedores reais ou dados sensiveis.
- Repo pode ser marcado como "Template repository".

## Validacoes esperadas

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- Smoke visual manual do starter e demo.
- Busca textual por nomes privados, provedores reais ou termos de dominio externo
  definidos no prompt da sessao.
