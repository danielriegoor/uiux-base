# PRD 0008 - Hardening da distribuicao v0.1.1

## Status

Implementado.

## Objetivo

Fortalecer a primeira versao publica sem ampliar o escopo funcional do MVP e
sem introduzir Playwright ou Storybook antes da integracao em um produto real.

## Decisoes

- manter `uiux-base/styles.css` como entrada completa e retrocompativel;
- oferecer `tokens.css`, `reset.css` e `components.css` como entradas opt-in;
- manter `theme.json` como fonte unica e gerar CSS e TypeScript deterministicos;
- fazer starter e demo consumirem os mesmos tokens nos temas claro e escuro;
- validar componentes representativos com axe-core sobre jsdom, sem duplicar a
  suite comportamental;
- validar tarballs com publint, Are the Types Wrong e consumidores React 18/19;
- versionar releases com Changesets;
- publicar por GitHub Actions com trusted publishing OIDC e provenance.

## Correcao funcional

O indicador do `StatusBar` passa a usar `data-ui-status-tone` e CSS estatico em
vez de classes Tailwind invalidas. O landmark `footer` e preservado, enquanto a
regiao viva `status` fica em um elemento ARIA compativel.

## Por que 0.1.1

A API existente permanece compativel. A entrega corrige comportamento visual e
semantico e adiciona exports, gates e automacao; portanto, a classificacao
correta e patch segundo SemVer.

## Fora do escopo

- teste E2E com Playwright;
- catalogo Storybook;
- novos componentes ou contratos de dominio;
- integracao com ConectaSeguroV2;
- backend, auth, billing ou graficos.

## Gates

1. tokens gerados devem estar sincronizados;
2. testes comportamentais e os dois smokes axe-core devem ficar verdes;
3. tarballs devem conter somente os artefatos publicos esperados;
4. `publint` e Are the Types Wrong devem aprovar ambos os packages;
5. consumidores temporarios React 18 e React 19 devem importar a biblioteca;
6. CI do PR deve ficar verde antes do merge;
7. a tag deve corresponder as versoes dos manifests;
8. o workflow publica app-kit antes de ui com OIDC e provenance;
9. a instalacao anonima pelo registry deve ser validada depois da publicacao.
