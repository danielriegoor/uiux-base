# PRD 0004 - Data Display, Tabelas e Graficos

> Supersedida. Graficos e Recharts foram removidos do MVP por `0007-reset-mvp-npm.md`.

**Status:** Proposto
**Depende de:** PRDs 0001, 0002 e 0003

## Decisao

Criar componentes genericos para exibicao de dados densos: DataTable, ChartPanel, KpiCard e StatusBadge.

## Objetivo

Padronizar tabelas, graficos e indicadores para que apps futuros nao recriem padroes de loading, empty, error, paginacao, sorting, tooltip e responsividade.

## Stack

- TanStack Table para DataTable.
- Recharts para graficos.
- Tokens compartilhados para cores de serie.
- Components de feedback do `packages/ui`.

## Estrutura alvo

```text
packages/ui/src/components/data-display/
  DataTable.tsx
  DataTableToolbar.tsx
  DataTablePagination.tsx
  DataTableEmptyState.tsx
  ChartPanel.tsx
  ChartTooltip.tsx
  KpiCard.tsx
  StatusBadge.tsx
```

## Escopo DataTable

- Colunas tipadas.
- Sorting.
- Filtro simples.
- Paginacao client-side.
- Empty state.
- Loading state.
- Error state.
- Acoes por linha.
- Label acessivel para tabela.
- Scroll horizontal intencional em telas pequenas.

## Escopo ChartPanel

- Header com titulo, descricao e acoes opcionais.
- Loading skeleton.
- Empty state.
- Error state.
- Tooltip padronizado.
- Formatacao de unidade e valor.
- Tokens de cores.
- Conteudo nao dependente apenas de cor.

## Fora do escopo

- Server-side pagination obrigatoria.
- Virtualizacao.
- Export CSV/PDF.
- Graficos altamente especificos.
- Dashboards de dominio real.

## Criterios de aceite

- DataTable e ChartPanel sao consumidos pelo demo.
- Starter possui uma rota generica com tabela e grafico.
- Testes cobrem loading, empty, error e dados.
- Acoes por linha sao acessiveis por teclado.
- Build passa.

## Validacoes esperadas

- Teste especifico de DataTable.
- Teste especifico de ChartPanel.
- `pnpm test`
- `pnpm build`
- Smoke visual em mobile e desktop.
