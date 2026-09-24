# Uso do template e do pacote

O `uiux-base` pode ser adotado de duas formas independentes.

## 1. Instalar a biblioteca em um app existente

```bash
npm install uiux-base
```

No bootstrap React:

```tsx
import "uiux-base/styles.css";
```

Nos componentes:

```tsx
import {
  Button,
  DashboardContent,
  DashboardShell,
  Sidebar,
  type NavigationItem
} from "uiux-base";
```

O CSS ja esta compilado. Nao adicione o `src` deste package ao scan do Tailwind.
React e React DOM 18 ou 19 devem existir no app consumidor.

### CSS opt-in

O import `styles.css` agrega tokens, reset e componentes. Um produto que ja
possui reset global pode importar somente as camadas necessarias:

```tsx
import "uiux-base/tokens.css";
import "uiux-base/components.css";
```

Adicione `uiux-base/reset.css` somente se quiser o reset e a regra global de
`prefers-reduced-motion` da biblioteca.

### Personalizar a marca

Sobrescreva tokens no CSS do produto:

```css
:root {
  --ui-accent-solid: hsl(221 83% 53%);
  --ui-accent-hover: hsl(224 76% 48%);
  --ui-ring: hsl(221 83% 53%);
}
```

Para tema escuro, use `data-ui-theme="dark"` ou a classe `dark` em um ancestral.

## 2. Criar um repo a partir do GitHub Template

Use o botao `Use this template` em
`https://github.com/danielriegoor/uiux-base`. Depois:

```bash
npm ci
npm run check
npm run dev --workspace starter
```

Troque fixtures por dados do seu produto dentro do app criado. O package visual
nao deve receber endpoints, tokens ou regras de negocio.

## Ownership no produto consumidor

- `pages`: rota, permissao, carregamento e composicao;
- `features/<dominio>`: UI, hooks e helpers do fluxo;
- `components`: visual compartilhado do produto, sem API sensivel;
- `services`: cliente HTTP e contratos externos do produto;
- `styles`: CSS Modules locais e overrides de tokens;
- testes: proximos do comportamento.

Use `React.lazy` + `Suspense` para paginas ou features pesadas. Skeleton e apenas
o fallback visual; a divisao de codigo vem do import dinamico.

## Contratos no MVP

Crie um tipo local quando ele reduz ambiguidade real. Adicione um schema de
runtime somente em uma fronteira nao confiavel, por exemplo resposta externa,
storage ou formulario complexo. Nao replique todos os modelos do backend no
frontend e nao introduza repository pattern por convencao.

## Publicacao npm

Cada mudanca publica recebe um Changeset. A tag/release so pode ser criada
depois de `npm run version:packages` e do merge em `main`.

Os pacotes publicos sao publicados pelo workflow `publish.yml`, nesta ordem:

```bash
npm run release:check -- vX.Y.Z
npm publish --workspace uiux-base-app-kit --access public --provenance
npm publish --workspace uiux-base --access public --provenance
```

O npm autoriza o workflow por trusted publishing OIDC, sem segredo de longa
duracao. O segundo package depende da mesma versao publicada do app-kit. A
verificacao final e feita instalando `uiux-base` pelo registry em um diretorio
temporario limpo.
