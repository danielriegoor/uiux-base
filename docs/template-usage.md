# Uso do template

Este repo e um template privado para iniciar apps React/Vite com shell, componentes,
fixtures locais, testes e documentacao de QA. Ele deve continuar neutro: sem dados
reais, segredos, endpoints privados, regras de produto especifico ou integracoes
reais por padrao.

## Criar um novo repo pelo GitHub

1. Abra o repo `danielriegoor/uiux-base` no GitHub.
2. Use `Use this template` e escolha `Create a new repository`.
3. Defina owner, nome e visibilidade do novo projeto.
4. Clone o novo repo.
5. Rode `pnpm install`.
6. Rode `pnpm lint`, `pnpm test` e `pnpm build` antes da primeira mudanca.

O repo de origem deve ser marcado como `Template repository` em `Settings` depois
que CI, docs e smoke visual estiverem verdes.

## Rodar localmente

Na raiz do repo:

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

Apps locais:

```bash
pnpm --filter starter dev
pnpm --filter demo dev
```

Por padrao:

- `apps/starter` roda em `http://localhost:5173`.
- `apps/demo` roda em `http://localhost:5174`.

## Renomear app e packages

Ao criar um projeto a partir do template, renomeie apenas o que pertence ao novo
produto. Preserve a separacao entre apps executaveis e packages reutilizaveis.

Checklist recomendado:

- Troque o nome raiz em `package.json`.
- Troque `name` em `apps/starter/package.json` se o app base virar produto.
- Atualize os aliases `@uiux-base/*` em `package.json`, imports e exports se o
  novo repo precisar de outro escopo.
- Ajuste `workspaceConfig` em `packages/config/src/index.ts`.
- Atualize os textos de marca em `apps/starter/src/App.tsx`.
- Atualize `README.md`, `AGENTS.md` e docs do novo repo.
- Rode `rg "@uiux-base|uiux-base|starter|demo"` para revisar residuos esperados.
- Rode `pnpm lint`, `pnpm test` e `pnpm build`.

Nao renomeie packages compartilhados para nomes de dominio quando eles ainda
forem componentes genericos.

## Trocar fixtures por API real

Os apps usam fixtures para manter o template executavel sem backend. Para conectar
um produto real:

1. Crie uma camada local no app consumidor, por exemplo `apps/starter/src/services`.
2. Busque dados reais nessa camada, nunca em `packages/ui`.
3. Mapeie a resposta externa para tipos genericos usados pela tela.
4. Mantenha estados explicitos de loading, empty, error, success e blocked.
5. Preserve labels, roles e feedback acessivel.
6. Remova fixtures somente depois de cobrir sucesso, vazio e erro com testes.

Detalhes e exemplo de adaptador ficam em `docs/fixtures-para-api-real.md`.

## O que cada app entrega

`apps/starter` e a base para novos produtos:

- shell responsivo;
- rotas de dashboard, overview, records, analytics e settings;
- indicadores, tabela, grafico, formulario e estados;
- fixtures locais substituiveis.

`apps/demo` e a vitrine tecnica:

- primitives e estados do pacote UI;
- forms, tabela, graficos e dashboard shell;
- rotas dedicadas para validar componentes isolados.

## Validacao antes de reutilizar

Antes de usar o template como base de um projeto novo:

- `pnpm lint`
- `pnpm test`
- `pnpm build`
- smoke visual de starter e demo em 375px, 768px, 1024px e desktop largo;
- busca textual por nomes privados, provedores reais, endpoints e termos de
  dominio externo;
- `gh run list` para confirmar o estado recente do CI.

## Marcar como Template repository

No GitHub:

1. Abra `Settings` do repo.
2. Em `General`, localize `Template repository`.
3. Marque a opcao.
4. Mantenha a visibilidade privada enquanto o template for de uso pessoal.
5. Salve a alteracao.

Depois disso, futuros projetos podem nascer pelo botao `Use this template`.
