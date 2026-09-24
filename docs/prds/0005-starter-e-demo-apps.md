# PRD 0005 - Starter e Demo Apps

> Historico da fundacao. O escopo vigente esta em `0007-reset-mvp-npm.md`.

**Status:** Proposto
**Depende de:** PRDs 0001-0004

## Decisao

Criar dois apps no monorepo:

- `apps/starter`: app base que sera usado como template de produto.
- `apps/demo`: vitrine tecnica dos componentes e padroes.

## Objetivo

Validar que os packages sao realmente reutilizaveis e que um novo projeto pode comecar com uma experiencia funcional.

## apps/starter

O starter deve abrir direto em uma interface de aplicacao. Nao deve ser landing page.

Rotas sugeridas:

```text
/
/dashboard
/dashboard/overview
/dashboard/records
/dashboard/analytics
/dashboard/settings
```

Exemplos genericos:

- cards de indicadores;
- tabela de registros;
- grafico de serie temporal;
- formulario simples;
- estados loading, empty, error e blocked;
- navegacao responsiva.

## apps/demo

O demo deve servir como vitrine e testbed:

```text
/components
/components/forms
/components/feedback
/components/data-table
/components/charts
/patterns/dashboard-shell
/patterns/states
```

## Dados

Usar fixtures genericas:

- usuarios ficticios;
- organizacoes ficticias;
- projetos ficticios;
- metricas ficticias;
- eventos ficticios.

Nao usar dados, nomes, exemplos ou regras de produto especifico.

## Escopo

- Integrar `packages/ui`.
- Integrar `packages/app-kit`.
- Criar rotas de exemplo.
- Criar fixtures locais.
- Criar docs de como substituir fixtures por API real.
- Garantir responsividade basica.

## Fora do escopo

- Auth real.
- Banco real.
- Backend real.
- Billing real.
- Deploy.
- Dados reais.

## Criterios de aceite

- `apps/starter` roda e demonstra a estrutura final.
- `apps/demo` exibe componentes e estados.
- O template e compreensivel sem ler internals dos packages.
- Build passa para ambos os apps.

## Validacoes esperadas

- `pnpm --filter starter dev`
- `pnpm --filter demo dev`
- `pnpm --filter starter build`
- `pnpm --filter demo build`
- Smoke visual nas rotas principais.
