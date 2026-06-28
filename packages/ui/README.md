# @uiux-base/ui

Pacote neutro de design system para apps React/Vite do workspace.

## Uso

Importe o CSS global uma vez no app consumidor, antes dos estilos locais:

```css
@import "tailwindcss";
@import "@uiux-base/ui/styles/globals.css";

@source "../../../packages/ui/src";
```

Use os componentes pelo barrel publico:

```tsx
import { Button, Dialog, KpiCard, StatusBadge } from "@uiux-base/ui";
```

## Conteudo

- `cn`, tokens iniciais de cor, espacamento e graficos.
- Primitives: Button, Input, Textarea, Select, Checkbox, Dialog, DropdownMenu, Tabs, Tooltip e Skeleton.
- Estados: EmptyState, ErrorState, LoadingState, BlockedState e ToastProvider.
- Formularios: FieldGroup, FormSection e SubmitBar.
- Dados simples: KpiCard e StatusBadge.

## Regras

- O pacote nao contem regra de negocio, API real, auth, billing ou dados de produto.
- Componentes interativos devem manter nome acessivel e navegacao por teclado.
- Estados dinamicos usam `role="status"` para loading e `role="alert"` para erro.
- Botao icon-only deve receber `aria-label` no consumo.
