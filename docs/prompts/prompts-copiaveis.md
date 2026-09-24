# Prompts copiaveis

## Adotar em um frontend existente

```text
Compare o frontend atual com a API publica de uiux-base. Nao altere backend,
auth, persistencia ou regras de negocio. Instale com npm, importe
uiux-base/styles.css uma vez e substitua apenas primitives, estados e shell que
tenham equivalencia comprovada. Preserve CSS Modules locais das features.
Escreva teste RED para cada comportamento alterado e valide 375, 768, 1024 e
1440px. Nao crie espelho de DTO ou schema Zod sem fronteira runtime real.
```

## Criar uma feature no app consumidor

```text
Crie src/features/<dominio> com componentes, hooks e helpers necessarios. A page
deve apenas orquestrar rota, permissao, dados e composicao. Reuse componentes de
uiux-base. O cliente HTTP pertence a src/services do produto. Comece com teste
de comportamento por role/label, implemente o minimo e rode a suite relevante.
```

## Evoluir a biblioteca

```text
Antes de adicionar uma abstracao a uiux-base, prove repeticao em pelo menos dois
usos ou uma necessidade explicita. Mantenha packages/ui sem negocio e
packages/app-kit sem API/auth reais. Atualize docs, tipos e testes; rode
npm run check, empacote e instale em consumidor temporario antes do PR.
```

## Publicar nova versao

```text
Confirme diff e semver dos dois packages publicos. Rode npm ci e npm run check.
Publique uiux-base-app-kit antes de uiux-base, valide npm view e instale
uiux-base pelo registry em um diretorio temporario. Diferencie GitHub/CI da
prova de publicacao npm.
```
