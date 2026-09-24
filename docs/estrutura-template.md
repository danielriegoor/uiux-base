# Estrutura do template

```text
uiux-base/
  apps/
    starter/          app base executavel
    demo/             catalogo tecnico executavel
  packages/
    ui/               package npm uiux-base
      src/components/
      src/styles/
      src/tokens/
    app-kit/          package npm uiux-base-app-kit
      src/layout/
      src/guards/
      src/hooks/
      src/navigation/
      src/states/
      src/feature-template/
    config/           convencoes internas
  scripts/
    check-package.mjs
  docs/
    prds/
    prompts/
  .github/workflows/
    ci.yml
```

## API publica

O consumidor instala somente `uiux-base`. O barrel desse package reexporta o
app-kit, preservando a separacao interna sem exigir duas instalacoes manuais.
Os artefatos publicados sao JavaScript ESM, declaracoes TypeScript e o CSS
compilado em `uiux-base/styles.css`.

## O que nao existe por padrao

- backend ou camada de persistencia;
- auth ou billing real;
- cliente HTTP;
- schemas Zod/espelho de DTO;
- graficos e Recharts;
- repository pattern;
- configuracao especifica de produto.

Esses itens podem existir no app consumidor quando o caso concreto exigir.
