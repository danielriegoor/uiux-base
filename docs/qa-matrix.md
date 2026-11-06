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

## Registro da versão 0.2.0

- Em 2026-11-06, starter e demo compilados passaram no Chrome a 375, 768, 1024
  e 1440 px sem overflow horizontal nem erros no console.
- Drawer mobile com nome, descrição e foco restaurado por Escape. Link de
  React Router troca de rota sem recarregar. Redimensionar para desktop
  fecha o drawer e move o foco para o `main`.
- A navegação rola de forma independente no desktop. O shell em modo
  `workspace` mantém a rolagem no `main`.
- Modal centralizado desde o primeiro quadro, com rolagem para conteúdo
  longo e sem animação em movimento reduzido. `Select` aninhado fecha e
  permite reabrir o `Dialog`. Portais seguem o tema aplicado ao `html`.
- A suíte local passou com 45 testes em 17 arquivos, incluindo dois smokes
  axe-core. Os tarballs foram validados em React 18 e React 19.
- Tailwind CSS e o plugin Vite usam `4.3.5`. A auditoria sem dependências de
  desenvolvimento encontrou zero alertas. A auditoria completa não encontrou
  alertas altos ou críticos após as atualizações do lockfile. Os alertas
  moderados restantes partem do `minimatch` usado pelas ferramentas de lint.

Validacao local, CI do PR, publicacao npm e instalacao pelo registry continuam
sendo provas distintas.
