# PRD 0007 - Reset MVP e distribuicao npm

## Status

Implementado nesta fatia. Este documento substitui o escopo operacional das
PRDs 0000-0006 sem apagar o historico.

## Problema

A base inicial acumulou contratos, cliente HTTP e graficos antes de existir uma
necessidade concreta dos projetos consumidores. Tambem estava presa a pnpm e a
nomes internos, impedindo a instalacao simples como biblioteca publica.

## Decisao

Entregar um MVP frontend-only, npm-only e instalavel por um unico comando:

```bash
npm install uiux-base
```

`uiux-base` e a API publica. `uiux-base-app-kit` preserva a separacao interna e
e instalado de forma transitiva.

## Dentro do escopo

- React 18, Vite, TypeScript, Tailwind e React Router nos apps;
- primitives Radix, formularios, feedback, tabela e shell responsivo;
- tokens semanticos claros/escuros e CSS compilado;
- paginas como orquestradoras e features como donas do fluxo;
- CSS Modules locais no produto consumidor;
- TDD com Vitest, jsdom e Testing Library;
- CI por `npm ci` + `npm run check`;
- tarballs npm validados em consumidor temporario limpo.

## Fora do escopo

- backend, auth, billing e provedores;
- cliente HTTP ou repository pattern dentro da biblioteca;
- contratos duplicados do backend;
- Zod sem fronteira runtime comprovada;
- graficos/Recharts;
- dados, nomes ou regras de qualquer produto consumidor.

## Referencias arquiteturais adotadas

- `pages` orquestra rota, dados, permissao e composicao;
- `features` contem UI, hooks e helpers especializados;
- componentes compartilhados permanecem visuais;
- tokens globais e CSS Modules locais tem responsabilidades diferentes;
- `React.lazy` + `Suspense` e o padrao para fatias pesadas;
- testes provam comportamento publico e acessibilidade.

## Gates

1. `npm ci` reproduz a arvore.
2. `npm run check` fica verde.
3. `npm pack` inclui JS, tipos e CSS, sem fontes/testes.
4. consumidor temporario instala os dois tarballs e importa `uiux-base`.
5. smoke visual cobre 375, 768, 1024 e 1440px.
6. CI do PR fica verde.
7. packages sao publicados na ordem app-kit para uiux-base.
8. instalacao pelo registry e validada separadamente.

## Risco principal

Publicacao no npm exige uma sessao autenticada com direito aos nomes escolhidos.
Repo publico e pacote npm publico sao estados independentes.
