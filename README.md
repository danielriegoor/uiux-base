# uiux-base

Template privado e neutro para iniciar apps React/Vite com base reutilizavel de UI, UX, testes e arquitetura de features.

## Objetivo

O `uiux-base` vai servir como monorepo pessoal para projetos front-end data-dense, dashboards internos, prototipos SaaS e apps operacionais. A intencao e consolidar padroes de componentes, layout, estados, acessibilidade e validacao sem carregar dominio de nenhum produto especifico.

## Status atual

Este commit inicial importa apenas o planejamento do template:

- PRDs em `docs/prds/`.
- Prompts copiaveis em `docs/prompts/`.
- Estrutura alvo documentada em `docs/estrutura-template.md`.
- Regras iniciais para agentes em `AGENTS.md`.

Ainda nao ha apps, packages, dependencias, scripts, CI ou build configurados. Isso entra nas proximas fatias de implementacao.

## Principios

- Primeira tela dos apps futuros deve ser experiencia de aplicacao, nao landing page.
- Componentes devem ser acessiveis, responsivos e explicitos em loading, empty, error, success e blocked.
- O template deve permanecer neutro: sem Tatico, DinastIA, dados reais, segredos, endpoints reais, Supabase, Asaas, billing real ou auth real.
- Mudancas de comportamento React/DOM devem seguir TDD real.
- Antes de finalizar fatias implementadas, validar com lint, testes e build quando esses scripts existirem.

## Planejamento

Comece por:

1. `docs/prds/0000-produto-e-escopo.md`
2. `docs/prds/0001-fundacao-do-repo-template.md`
3. `docs/prompts/prompts-copiaveis.md`
4. `docs/estrutura-template.md`
