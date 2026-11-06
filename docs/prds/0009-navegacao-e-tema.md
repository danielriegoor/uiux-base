# PRD 0009 — Navegação, tema e diálogos

O uso da base em um app consumidor expôs uma falha no drawer mobile. O shell
fechava na captura do clique e podia desmontar o link antes que o roteador
tratasse a navegação. Telas operacionais também precisavam manter navegação,
marca e rodapé alcançáveis enquanto o conteúdo rolava.

## Contratos

- O drawer fecha após um clique primário em link da mesma janela. Cliques
  modificados, links para outra janela e downloads mantêm o drawer aberto.
  Escape restaura foco ao gatilho. Ao mudar para desktop com o drawer aberto,
  o shell fecha o drawer e move o foco para o conteúdo principal.
- `Sidebar` mantém `items` e oferece `groups` com rótulos acessíveis. Grupos
  vazios são omitidos. A rota atual tem `aria-current="page"` e usa tokens de
  acento. Marca e rodapé ficam separados da rolagem dos links.
- `DashboardShell` mantém `layout="page"` como padrão. `layout="workspace"`
  usa a janela inteira com rolagem do conteúdo principal.
- `ThemeToggle` é controlado. O app decide como persistir a preferência e
  aplica `data-ui-theme` no `html` para incluir os portais. A paleta do app
  pode sobrescrever os tokens de base via camadas CSS.
- `DialogContent` mantém a centralização durante a animação, limita a altura
  à janela e permite rolar conteúdo longo. Com movimento reduzido, abre e
  fecha sem animação. `Dialog` e `Select` podem ser usados juntos.

## Aceite

- Teste comportamental com link real do roteador, foco do drawer, descrição,
  grupos vazios, rota atual e alternância do tema por teclado.
- Smoke com starter e demo compilados a 375, 768, 1024 e 1440 px. Verificar
  rolagem, foco, largura, tema no portal, modal centralizado desde a entrada
  e reabertura após fechar um `Select` dentro do `Dialog`.
- Gate de release com tarballs instalados em React 18 e 19 e tipos ESM.
