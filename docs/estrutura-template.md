# Estrutura alvo do repo uiux-base

## Decisao

O `uiux-base` deve nascer como um monorepo de template, nao apenas como uma biblioteca de componentes. O objetivo e permitir que um novo projeto comece com app funcional, packages internos e docs de governanca.

## Arvore alvo

```text
uiux-base/
  apps/
    starter/
      src/
        app/
        features/
        routes/
        styles/
        test/
      index.html
      package.json
      vite.config.ts
    demo/
      src/
        app/
        examples/
        routes/
        styles/
        test/
      index.html
      package.json
      vite.config.ts
  packages/
    ui/
      src/
        components/
          ui/
          feedback/
          forms/
          data-display/
        styles/
        tokens/
        lib/
      package.json
      tsconfig.json
      vite.config.ts
    app-kit/
      src/
        layout/
        guards/
        navigation/
        feature-template/
        services/
        hooks/
        states/
      package.json
      tsconfig.json
      vite.config.ts
    config/
      eslint/
      tsconfig/
      vitest/
      package.json
  docs/
    prds/
    prompts/
    template-usage.md
    conventions.md
    qa-matrix.md
  .github/
    workflows/
      ci.yml
  AGENTS.md
  README.md
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
```

## Package names

Usar nomes neutros e internos:

- `@uiux-base/ui`
- `@uiux-base/app-kit`
- `@uiux-base/config`

Se algum dia forem publicados fora do repo, avaliar trocar para scope pessoal, como `@danielriegoor/ui`, mas isso nao e requisito inicial.

## Stack padrao

- React 18.
- Vite.
- TypeScript.
- React Router.
- Tailwind CSS.
- Radix UI e shadcn-style local components.
- lucide-react.
- Sonner.
- TanStack Table.
- Recharts.
- Vitest.
- jsdom.
- Testing Library React.
- Testing Library jest-dom.
- Testing Library user-event.

## Scripts esperados

No root:

```json
{
  "scripts": {
    "lint": "pnpm -r lint",
    "test": "pnpm -r test",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "check": "pnpm lint && pnpm test && pnpm build"
  }
}
```

Cada app/package deve ter scripts locais equivalentes quando fizer sentido.

## Regras de arquitetura

- `packages/ui` contem componentes visuais e primitives sem regra de negocio.
- `packages/app-kit` contem shell, guards visuais, padroes de estado, hooks genericos e templates de feature.
- `apps/starter` demonstra um produto generico, pronto para copiar.
- `apps/demo` documenta e exercita componentes e padroes.
- O template nao deve conter backend real.
- O template nao deve chamar provedores reais, repositorios externos ou qualquer API sensivel.
- Services REST devem ser exemplos leves e substituiveis.
- Nao introduzir repository pattern por padrao.

## Regra de primeira tela

O `apps/starter` deve abrir como experiencia de aplicacao, nao como landing page. A primeira tela deve demonstrar shell, navegacao, estados e conteudo de produto generico.

## GitHub Template

Depois da implementacao e validacao:

1. Abrir `Settings` do repo no GitHub.
2. Marcar `Template repository`.
3. Manter o repo privado enquanto houver risco de acoplamento com padroes internos.
4. Usar "Use this template" para criar projetos futuros.
