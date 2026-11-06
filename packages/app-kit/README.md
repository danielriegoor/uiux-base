# uiux-base-app-kit

Shell, navegacao, hooks e estados visuais usados pelo pacote `uiux-base`.

Normalmente este pacote chega como dependencia transitiva:

```bash
npm install uiux-base
```

Use o barrel de `uiux-base` no app consumidor. A instalacao direta deste pacote
fica disponivel apenas para composicoes avancadas.

`DashboardShell` oferece dois layouts. `page` preserva a largura contida e
a rolagem do documento. `workspace` ocupa a janela e mantem a rolagem no
conteudo principal. Em desktop, a sidebar acompanha a janela. Passe
`mobileNavigationDescription` para descrever o drawer a leitores de tela.

`Sidebar` aceita `items` para uma lista simples e `groups` para secoes com
`label` e `items`. Os links podem ser construidos com `createRouteNav` e
renderizados por um roteador via `renderLink`. As secoes rolam sem mover a
marca ou o rodape.

Este package nao implementa auth, API, regras de negocio ou repository pattern.
