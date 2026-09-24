# PRD 0002 - Design System e UI Package

> Historico da fundacao. O escopo vigente esta em `0007-reset-mvp-npm.md`.

**Status:** Proposto
**Depende de:** PRD 0001

## Decisao

Criar `packages/ui` como fonte principal de componentes visuais, primitives, tokens e estados compartilhados.

## Objetivo

Oferecer uma base visual consistente para novos apps sem depender de kits visuais concorrentes. O package deve ser simples de consumir pelo starter e pelo demo.

## Stack visual

- Tailwind CSS.
- Radix UI.
- Componentes locais em estilo shadcn/ui.
- lucide-react para icones.
- Sonner para toast.
- class-variance-authority quando variantes forem necessarias.

## Estrutura alvo

```text
packages/ui/src/
  components/
    ui/
      button.tsx
      input.tsx
      textarea.tsx
      select.tsx
      checkbox.tsx
      dialog.tsx
      dropdown-menu.tsx
      tabs.tsx
      tooltip.tsx
      skeleton.tsx
    feedback/
      EmptyState.tsx
      ErrorState.tsx
      LoadingState.tsx
      BlockedState.tsx
      ToastProvider.tsx
    forms/
      FieldGroup.tsx
      SubmitBar.tsx
      FormSection.tsx
    data-display/
      KpiCard.tsx
      StatusBadge.tsx
  lib/
    cn.ts
  tokens/
    colors.ts
    spacing.ts
    chartTokens.ts
  styles/
    globals.css
```

## Escopo

- Criar `cn`.
- Criar primitives de UI com foco em acessibilidade.
- Criar estados compartilhados: loading, empty, error, success e blocked.
- Criar toast com Sonner.
- Criar tokens iniciais.
- Criar exemplos no `apps/demo`.
- Criar testes para componentes com comportamento.
- Documentar uso em `docs/conventions.md` ou README do package.

## Regras

- Nao adicionar MUI, Chakra, Ant Design, Bootstrap, Mantine ou outro kit visual paralelo.
- Nao colocar regra de negocio no package.
- Botoes icon-only devem ter `aria-label`.
- Loading dinamico deve usar `role="status"` quando aplicavel.
- Error dinamico deve usar `role="alert"` quando aplicavel.
- Dialogs devem ter foco inicial, fechamento por teclado e labels.

## Fora do escopo

- DataTable completo.
- ChartPanel completo.
- DashboardShell.
- Forms complexos com React Hook Form e Zod.
- Auth real.
- API real.

## Criterios de aceite

- `packages/ui` exporta componentes principais.
- `apps/demo` consome componentes via package.
- Os componentes nao dependem de app especifico.
- Testes cobrem interacoes principais.
- Build passa.

## Validacoes esperadas

- `pnpm --filter @uiux-base/ui test`
- `pnpm --filter @uiux-base/ui build`
- `pnpm --filter demo build`
- Smoke visual do demo.
