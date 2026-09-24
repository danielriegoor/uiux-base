# uiux-base

Pacote npm publico de UI/UX para React 18. Inclui primitives acessiveis,
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
`dark` em um ancestral. Tokens `--ui-*` podem ser sobrescritos pelo produto.

O pacote nao contem regra de negocio, API, auth, billing, graficos ou schemas de
contrato. React e React DOM sao peer dependencies.
