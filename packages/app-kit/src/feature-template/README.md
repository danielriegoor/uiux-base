# Feature Template

Use esta pasta como molde para novas features em apps React/Vite baseados no
`uiux-base`.

```text
src/features/example/
  api.ts
  types.ts
  schemas.ts
  hooks.ts
  components/
  README.md
```

## Regras do molde

- `types.ts` concentra tipos publicos da feature.
- `schemas.ts` concentra validacoes leves e normalizacao de payload.
- `api.ts` usa funcoes diretas sobre `ApiClient`, sem repository pattern.
- `hooks.ts` orquestra estado de UI com hooks genericos.
- `components/` fica para componentes pequenos e especificos da feature.

Evite colocar auth real, backend real, chaves, endpoints sensiveis ou regra de
dominio dentro deste template.
