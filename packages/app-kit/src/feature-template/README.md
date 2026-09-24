# Feature minima

Comece somente com o componente que entrega a experiencia:

```text
feature-name/
  components/
    FeatureView.tsx
```

Adicione arquivos apenas quando houver repeticao ou uma fronteira real:

- `hooks/` para comportamento reutilizado por mais de um componente;
- tipos publicos perto do componente que os possui;
- schema runtime apenas para entrada nao confiavel, como formulario, JSON externo,
  storage ou resposta de API;
- funcoes de acesso a dados pertencem ao app consumidor, nao ao `uiux-base`.

Evite criar por padrao `api.ts`, DTOs, repositories, schemas espelho do backend ou
uma camada de contratos para props internas ja verificadas pelo TypeScript.
