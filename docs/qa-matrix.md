# Matriz de QA

Matriz final da PRD 0006 para validar readiness do template antes de marcar o
repo como `Template repository`.

## Viewports obrigatorios

| Viewport | Uso |
| --- | --- |
| 375px | mobile estreito |
| 768px | tablet ou mobile largo |
| 1024px | desktop compacto |
| 1440px | desktop largo |

## Checklist geral

| Checagem | Criterio |
| --- | --- |
| Overflow | Sem overflow horizontal acidental na pagina; overflow de tabela deve ficar contido. |
| Foco | Foco visivel em links, botoes, inputs, tabs, dialogs, selects e menus. |
| Tab order | Ordem de tabulacao segue a ordem visual principal. |
| Icon-only | Botoes sem texto possuem `aria-label`. |
| Inputs | Campos possuem label visivel, `aria-label` ou associacao por `htmlFor`. |
| Loading | Loading usa `role="status"` quando aplicavel. |
| Error | Error usa `role="alert"` quando aplicavel. |
| Textos | Titulos, badges, botoes e cards cabem nos containers. |
| Dados densos | Tabelas e graficos continuam legiveis em telas estreitas. |
| Neutralidade | Sem dados reais, endpoints privados, segredos ou termos de dominio externo. |

## Estados obrigatorios

| Estado | Onde validar |
| --- | --- |
| loading | `apps/starter` dashboard, `apps/demo` feedback e states |
| empty | `apps/starter` dashboard, `apps/demo` feedback |
| error | `apps/starter` dashboard, `apps/demo` feedback |
| success | status bar, badges, cards e app state boundary |
| blocked | `apps/starter` dashboard, `apps/demo` feedback e states |
| dense data | records, data table, charts e dashboard cards |
| readonly | demo de fields e estados visuais sem submissao real |
| action pending | formularios e botoes de submit como padrao a validar no app consumidor |

## Rotas do starter

| Rota | Estados/cobertura | 375 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- | --- |
| `/` | redirect para dashboard | Pass | Pass | Pass | Pass |
| `/dashboard` | success, loading, empty, error, blocked, charts | Pass | Pass | Pass | Pass |
| `/dashboard/overview` | cards, resumo, link para docs | Pass | Pass | Pass | Pass |
| `/dashboard/records` | dense data, busca, sorting, paginacao, row action | Pass | Pass | Pass | Pass |
| `/dashboard/analytics` | charts, lista densa, truncamento | Pass | Pass | Pass | Pass |
| `/dashboard/settings` | labels, checkbox, select, textarea, submit bar | Pass | Pass | Pass | Pass |

## Rotas da demo

| Rota | Estados/cobertura | 375 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- | --- |
| `/` | redirect para components | Pass | Pass | Pass | Pass |
| `/components` | cards, tabs, dialog, menu, tooltip, icon-only | Pass | Pass | Pass | Pass |
| `/components/forms` | inputs, select, textarea, checkbox, submit bar | Pass | Pass | Pass | Pass |
| `/components/feedback` | loading, empty, error, blocked | Pass | Pass | Pass | Pass |
| `/components/data-table` | dense data, row action, overflow contido | Pass | Pass | Pass | Pass |
| `/components/charts` | area, bar, legenda textual | Pass | Pass | Pass | Pass |
| `/patterns/dashboard-shell` | shell, cards, status bar | Pass | Pass | Pass | Pass |
| `/patterns/states` | loading guard, denied guard, blocked notice | Pass | Pass | Pass | Pass |

## Validacoes automatizadas

| Comando | Resultado esperado |
| --- | --- |
| `pnpm lint` | sem warnings ou erros |
| `pnpm test` | suite completa verde |
| `pnpm build` | packages e apps buildam |
| `gh run list` | CI recente verde depois do push |

## Registro da rodada final

- Data: 2026-07-01.
- Responsavel: Codex.
- Escopo: PRD 0006, docs de readiness, neutralidade e smoke visual.
- Viewports: 375px, 768px, 1024px e 1440px.
- Rotas/viewports verificadas no smoke: 56.
- Falhas visuais ou de acessibilidade basica no smoke: 0.
- Erros de console apos correcao de `Button` com Radix `asChild`: 0.
- Resultado: aprovado para marcar o repo como template privado apos CI verde no
  GitHub.
