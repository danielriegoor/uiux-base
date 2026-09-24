# Matriz de QA do MVP

## Viewports obrigatorios

| Viewport | Criterio |
| --- | --- |
| 375px | drawer acessivel, sem overflow horizontal |
| 768px | conteudo e formularios sem corte |
| 1024px | transicao para sidebar desktop |
| 1440px | largura de leitura e densidade equilibradas |

## Comportamentos

| Checagem | Criterio |
| --- | --- |
| Navegacao mobile | abre por botao nomeado, prende foco e fecha por botao/Escape/link |
| Skip link | aparece no foco e leva ao conteudo principal |
| Foco | visivel em links, botoes, campos, tabs, dialogs e menus |
| Touch | controles principais com alvo minimo de 44px |
| Estados | loading usa status; erro e bloqueio usam alert quando aplicavel |
| Tabela | overflow permanece contido; busca e paginacao funcionam por teclado |
| Temas | tokens claros e escuros mantem leitura e estados distinguiveis |
| Motion | `prefers-reduced-motion` reduz animacoes e transicoes |
| Neutralidade | sem dominio, dados reais, backend, segredo ou endpoint privado |

## Gates automatizados

| Comando | Prova |
| --- | --- |
| `npm run lint` | padroes estaticos sem warnings |
| `npm run tokens:check` | CSS e TypeScript sincronizados com `theme.json` |
| `npm run typecheck` | tipos de todos os workspaces |
| `npm run test:workspaces` | comportamento React, helpers e dois smokes axe-core |
| `npm run build` | packages e apps compilam |
| `npm run check:package` | CSS/tarballs e consumidores React 18/19 limpos |
| `npm run lint:packages` | metadados e exports aprovados pelo publint |
| `npm run check:types` | tipos ESM aprovados pelo Are the Types Wrong |
| `npm run check` | gate completo local e de CI |

## Registro da rodada atual

- Data: 2026-09-23.
- Starter e demo: 375, 768, 1024 e 1440px sem overflow horizontal.
- Mobile: drawer abre com foco no fechamento e Escape devolve foco ao gatilho.
- Breakpoint: drawer em 375/768; sidebar desktop em 1024/1440.
- Console do browser: zero warnings ou erros no smoke final.
- Suite local: 17 arquivos e 41 testes verdes, incluindo somente dois smokes
  axe-core representativos e sem E2E.
- Empacotamento: dois tarballs instalados em consumidores React 18 e React 19.

Validacao local, CI do PR, publicacao npm e instalacao pelo registry continuam
sendo provas distintas.
