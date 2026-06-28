# PRD 0000 - Produto e Escopo do uiux-base

**Status:** Proposto
**Repo alvo:** `github.com/danielriegoor/uiux-base`
**Visibilidade inicial:** Privado

## Decisao

Criar um repo pessoal e privado para servir como template reutilizavel de apps React/Vite com UX consistente, componentes acessiveis, arquitetura de features e padroes de validacao.

O Tatico pode ser usado como referencia read-only, mas o `uiux-base` deve nascer neutro e independente.

## Objetivo

Reduzir o custo de iniciar novos projetos front-end SaaS, principalmente dashboards, apps operacionais e interfaces data-dense. O template deve entregar uma base pronta para:

- layout de dashboard;
- design system;
- componentes de formulario;
- tabelas;
- graficos;
- estados loading, empty, error, success e blocked;
- responsividade;
- acessibilidade basica;
- testes de comportamento.

## Contexto

As PRDs UI 001-020 do Tatico consolidaram varios padroes reutilizaveis:

- fundacao de design system;
- primitives Radix/shadcn;
- toast com Sonner;
- formularios com React Hook Form e Zod;
- DataTable com TanStack Table;
- DashboardShell;
- ChartPanel com Recharts;
- feature folders;
- services REST leves;
- CSS ownership;
- matriz QA de UX antes de polish visual.

O `uiux-base` deve extrair esses aprendizados como padroes genericos, sem copiar regras de negocio do Tatico.

## Publico alvo

- Projetos pessoais futuros.
- Protótipos SaaS.
- Dashboards internos.
- Apps B2B data-dense.
- Bases que possam ser usadas por agentes Codex em novos repos.

## Escopo

- Criar monorepo template com apps e packages internos.
- Documentar decisoes em PRDs.
- Criar starter app e demo app.
- Criar design system neutro.
- Criar app-kit com shell, states e arquitetura de features.
- Criar tabela e grafico reutilizaveis.
- Criar docs de uso, convencoes e QA.
- Criar CI basico de lint, teste e build.

## Fora do escopo

- Implementar dominio Tatico.
- Copiar nomes, textos, dados ou regras de negocio do Tatico.
- Implementar Supabase, Asaas, billing real ou auth real.
- Criar backend real.
- Publicar packages no npm.
- Tornar o repo publico.
- Criar landing page de marketing.

## Principios de UX

- Primeira tela deve ser app utilizavel, nao landing page.
- Interfaces operacionais devem ser densas, claras e escaneaveis.
- Componentes devem ter estados explicitos.
- Acessibilidade basica e obrigatoria, especialmente teclado, labels, roles e feedback dinamico.
- Responsividade deve ser validada em 375px, 768px, 1024px e desktop largo.
- Textos nao devem quebrar layouts.

## Criterios de aceite

- Existe um repo privado `danielriegoor/uiux-base`.
- O repo contem PRDs e docs de uso.
- O template nao contem acoplamento com Tatico ou DinastIA.
- O starter app roda localmente.
- Demo app exibe os componentes principais.
- CI roda lint, testes e build.

## Validacoes esperadas

- `pnpm install`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- Smoke visual manual do starter e demo.
- Revisao de textos e nomes para garantir neutralidade.
