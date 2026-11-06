# uiux-base

Pacote npm publico de UI/UX para React 18 e 19. Inclui primitives acessiveis,
componentes de feedback, formularios, data table e o app shell exportado pelo
`uiux-base-app-kit`.

```bash
npm install uiux-base
```

```tsx
import "uiux-base/styles.css";
import { Button, DashboardShell, KpiCard, StatusBadge } from "uiux-base";
```

O CSS e precompilado: o consumidor nao precisa apontar o Tailwind para o codigo
fonte do pacote. Para tema escuro, aplique `data-ui-theme="dark"` ou a classe
`dark` em um ancestral. Para incluir componentes em portais no `body`, aplique
o tema no `html`. Use `ThemeToggle` com `theme` e `onThemeChange` quando o app
precisar de um controle por teclado ou toque. Tokens `--ui-*` podem ser
sobrescritos pelo produto.

`styles.css` agrega tokens, reset e componentes. Para integracao avancada,
importe separadamente `tokens.css`, `components.css` e, se desejado,
`reset.css`.

Com Tailwind 4, `@import "uiux-base/tokens.css" layer(base);` permite que
overrides declarados depois na camada `base` definam a paleta do app.

O pacote nao contem regra de negocio, API, auth, billing, graficos ou schemas de
contrato. React e React DOM sao peer dependencies.
