# Como trocar fixtures por API real

`apps/starter` e `apps/demo` usam fixtures locais para manter o template neutro e executavel sem backend. Ao conectar um produto real, preserve os contratos de UI e substitua somente a origem dos dados.

## Onde trocar

- `apps/starter/src/fixtures.ts`: dados usados por dashboard, overview, records, analytics e settings.
- `apps/demo/src/fixtures.ts`: dados usados pela vitrine de componentes e padroes.
- Paginas em `apps/*/src/App.tsx`: chamadas atuais importam arrays locais; troque por hooks ou loaders do app real.

## Padrao recomendado

1. Crie um cliente de API do produto em uma camada local do app, por exemplo `src/services/api.ts`.
2. Mapeie a resposta externa para os tipos usados pela tela (`RecordFixture`, `DemoProject`, metricas e series temporais).
3. Mantenha estados explicitos de `loading`, `empty`, `error` e `blocked`.
4. Passe os dados normalizados para `DataTable`, `ChartPanel`, `KpiCard` e componentes de formulario.
5. Remova fixtures da rota somente depois de ter testes cobrindo sucesso, vazio e erro.

## Exemplo de adaptador

```ts
import type { RecordFixture } from "../fixtures";

type ApiRecord = {
  id: string;
  title: string;
  ownerName: string;
  organizationName: string;
  status: "ready" | "review" | "blocked";
  priority: "high" | "medium" | "low";
  updatedAt: string;
  total: number;
};

const statusMap = {
  blocked: "Blocked",
  ready: "Ready",
  review: "Review"
} satisfies Record<ApiRecord["status"], RecordFixture["status"]>;

export function mapApiRecord(record: ApiRecord): RecordFixture {
  return {
    id: record.id,
    organization: record.organizationName,
    owner: record.ownerName,
    priority:
      record.priority === "high"
        ? "High"
        : record.priority === "medium"
          ? "Medium"
          : "Low",
    status: statusMap[record.status],
    title: record.title,
    total: record.total,
    updatedAt: record.updatedAt
  };
}
```

## Cuidados

- Nao coloque tokens, URLs privadas ou segredos em fixtures, screenshots, commits ou docs.
- Nao copie dominio de produto para o template; normalize nomes para tipos genericos antes de usar componentes compartilhados.
- Se usar auth real, trate como escopo novo: guards visuais do `app-kit` nao persistem permissao.
- Se usar backend real, adicione testes de contrato no app consumidor e mantenha `packages/ui` sem regra de negocio.
