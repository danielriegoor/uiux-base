# PRD 0003 - App Kit e Arquitetura de Features

> Historico da fundacao. O escopo vigente esta em `0007-reset-mvp-npm.md`.

**Status:** Proposto
**Depende de:** PRDs 0001 e 0002

## Decisao

Criar `packages/app-kit` com padroes de estrutura de aplicacao: dashboard shell, navegacao, guards visuais, estados de workspace, services REST leves, hooks genericos e template de feature.

## Objetivo

Permitir que novos projetos comecem com uma arquitetura de app clara, sem arquivos gigantes e sem acoplamento com uma API especifica.

## Estrutura alvo

```text
packages/app-kit/src/
  layout/
    DashboardShell.tsx
    DashboardContent.tsx
    Sidebar.tsx
    Topbar.tsx
    StatusBar.tsx
  navigation/
    types.ts
    routeNav.ts
  guards/
    GuardNotice.tsx
    RequireAccess.tsx
  states/
    WorkspaceStateNotice.tsx
    AppStateBoundary.tsx
  services/
    apiClient.ts
    createMockClient.ts
  hooks/
    useAsyncState.ts
    useDisclosure.ts
  feature-template/
    README.md
    api.ts
    types.ts
    schemas.ts
    hooks.ts
    components/
```

## Escopo

- Criar DashboardShell responsivo.
- Criar slots para sidebar, topbar, status bar e conteudo.
- Criar guards visuais genericos para acesso negado, loading e blocked.
- Criar API client leve e substituivel.
- Criar hook generico para fluxos async simples.
- Criar template de feature documentado.
- Criar exemplo em `apps/starter`.

## Padrao de feature

```text
src/features/example/
  api.ts
  types.ts
  schemas.ts
  hooks.ts
  components/
  README.md
```

## Services REST leves

Services devem ser funcoes diretas:

```ts
export const listItems = () => apiClient.get<Item[]>("/items");
export const createItem = (payload: ItemInput) => apiClient.post<Item>("/items", payload);
```

Evitar:

- interfaces `Repository`;
- classes de repository;
- inversao de dependencia artificial;
- mocks acoplados a producao;
- chamada direta a servicos sensiveis em template generico.

## Fora do escopo

- Auth real.
- Billing real.
- Backend real.
- Provedores reais ou especificos.
- Algoritmos de dominio.
- Migracao de codigo de produto externo.

## Criterios de aceite

- `apps/starter` usa `DashboardShell`.
- Shell nao gera overflow horizontal em 375px.
- Guards visuais exibem estados claros.
- Feature example segue estrutura proposta.
- Build e testes passam.

## Validacoes esperadas

- Teste do shell em viewport pequena quando viavel.
- Teste de guard/blocked state.
- `pnpm test`
- `pnpm build`
- Smoke visual em 375px, 768px, 1024px e desktop.
