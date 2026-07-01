import { createAppMetadata } from "@uiux-base/app-kit";
import { workspaceConfig } from "@uiux-base/config";
import {
  BlockedState,
  Button,
  ChartPanel,
  DataTable,
  type DataTableProps,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  ErrorState,
  FieldGroup,
  FormSection,
  Input,
  KpiCard,
  LoadingState,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatusBadge,
  SubmitBar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ToastProvider,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UiFoundationMark,
  toast
} from "@uiux-base/ui";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

const appMetadata = createAppMetadata({
  name: "Demo",
  packageName: "demo"
});

const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600";

type DemoRecord = {
  id: string;
  name: string;
  owner: string;
  status: "Ativo" | "Pendente" | "Falha";
  volume: number;
};

const demoRecords: DemoRecord[] = [
  {
    id: "sample-1",
    name: "Registro Norte",
    owner: "Equipe A",
    status: "Ativo",
    volume: 124
  },
  {
    id: "sample-2",
    name: "Registro Sul",
    owner: "Equipe B",
    status: "Pendente",
    volume: 86
  },
  {
    id: "sample-3",
    name: "Registro Leste",
    owner: "Equipe C",
    status: "Falha",
    volume: 42
  },
  {
    id: "sample-4",
    name: "Registro Oeste",
    owner: "Equipe A",
    status: "Ativo",
    volume: 158
  },
  {
    id: "sample-5",
    name: "Registro Central",
    owner: "Equipe D",
    status: "Pendente",
    volume: 97
  },
  {
    id: "sample-6",
    name: "Registro Remoto",
    owner: "Equipe B",
    status: "Ativo",
    volume: 203
  }
];

const demoColumns: DataTableProps<DemoRecord>["columns"] = [
  {
    accessorKey: "name",
    header: "Registro"
  },
  {
    accessorKey: "owner",
    header: "Responsavel"
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const badgeStatus =
        status === "Ativo" ? "success" : status === "Pendente" ? "warning" : "danger";

      return <StatusBadge status={badgeStatus}>{status}</StatusBadge>;
    },
    header: "Status"
  },
  {
    accessorKey: "volume",
    cell: ({ row }) => row.original.volume.toLocaleString("pt-BR"),
    header: "Volume"
  }
];

const demoChartData = [
  { period: "Jan", backlog: 42, done: 78 },
  { period: "Fev", backlog: 36, done: 92 },
  { period: "Mar", backlog: 28, done: 116 },
  { period: "Abr", backlog: 31, done: 128 }
];

function FoundationPage() {
  return (
    <section className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {appMetadata.packageName}
      </p>
      <h1 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
        Demo da fundacao
      </h1>
      <p className="max-w-2xl text-base leading-7 text-slate-600">
        Espaço executável para validar o template sem introduzir componentes
        completos antes das próximas PRDs.
      </p>
      <UiFoundationMark />
    </section>
  );
}

function PackagesPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
        Pacotes do workspace
      </h1>
      <ul className="grid gap-3 sm:grid-cols-3">
        {workspaceConfig.packages.map((packageName) => (
          <li
            className="rounded-md border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800"
            key={packageName}
          >
            {packageName}
          </li>
        ))}
      </ul>
    </section>
  );
}

function DesignSystemPage() {
  return (
    <TooltipProvider delayDuration={0}>
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
            @uiux-base/ui
          </p>
          <h1 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
            Design system e UI package
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-600">
            Vitrine neutra dos primitives, estados e composicoes reutilizaveis
            previstos na PRD 0002.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <KpiCard
            helperText="Exemplo generico para validar card numerico."
            label="Receita mensal"
            trend="Alta de 8%"
            value="R$ 42k"
          />
          <KpiCard
            helperText="Valores ficticios, sem regra de negocio."
            label="Registros ativos"
            trend="Estavel"
            value="1.248"
          />
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Status</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status="success">Ativo</StatusBadge>
              <StatusBadge status="warning">Pendente</StatusBadge>
              <StatusBadge status="danger">Falha</StatusBadge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="actions">
          <TabsList aria-label="Exemplos do design system">
            <TabsTrigger value="form">Formulario</TabsTrigger>
            <TabsTrigger value="states">Estados</TabsTrigger>
            <TabsTrigger value="actions">Acoes</TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <FormSection
              description="Composicao basica de campos, sem validacao externa."
              title="Formulario neutro"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FieldGroup
                  hint="Use um nome generico para o registro."
                  htmlFor="record-name"
                  label="Nome"
                >
                  <Input id="record-name" placeholder="Registro exemplo" />
                </FieldGroup>
                <FieldGroup htmlFor="record-status" label="Status">
                  <Select defaultValue="active">
                    <SelectTrigger id="record-status">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="paused">Pausado</SelectItem>
                      <SelectItem value="blocked">Bloqueado</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
              <FieldGroup htmlFor="record-notes" label="Observacoes">
                <Textarea
                  id="record-notes"
                  placeholder="Notas curtas para demonstrar textarea"
                />
              </FieldGroup>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <Checkbox aria-label="Receber atualizacoes" />
                Receber atualizacoes deste registro
              </label>
              <SubmitBar cancelLabel="Cancelar" submitLabel="Salvar exemplo" />
            </FormSection>
          </TabsContent>

          <TabsContent value="states">
            <div className="grid gap-4 xl:grid-cols-2">
              <LoadingState title="Carregando dados" />
              <ErrorState
                action={<Button variant="outline">Tentar novamente</Button>}
                title="Falha ao carregar"
              />
              <EmptyState
                action={<Button>Novo item</Button>}
                title="Nenhum item encontrado"
              />
              <BlockedState
                action={<Button variant="outline">Solicitar acesso</Button>}
                title="Area bloqueada"
              />
            </div>
          </TabsContent>

          <TabsContent value="actions">
            <div className="flex flex-wrap items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Abrir dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar exemplo</DialogTitle>
                    <DialogDescription>
                      Este dialog apenas valida foco, label e fechamento por
                      teclado no pacote UI.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancelar</Button>
                    <Button>Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Mais acoes</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onSelect={() => {
                      toast.success("Exemplo executado");
                    }}
                  >
                    Disparar toast
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button aria-label="Ajuda do exemplo" size="icon" variant="ghost">
                    ?
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip exportado pelo pacote UI</TooltipContent>
              </Tooltip>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </TooltipProvider>
  );
}

function DataDisplayPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          PRD 0004
        </p>
        <h1 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
          Data display
        </h1>
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          Exemplos neutros de tabela, paginacao, sorting, filtro e grafico com
          legenda textual.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <KpiCard
          helperText="Total ficticio dos registros visiveis."
          label="Volume total"
          trend="Alta controlada"
          value="710"
        />
        <KpiCard
          helperText="Indicador generico de acompanhamento."
          label="Itens ativos"
          trend="Estavel"
          value="3"
        />
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Estados cobertos</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status="info">Loading</StatusBadge>
            <StatusBadge status="neutral">Empty</StatusBadge>
            <StatusBadge status="danger">Error</StatusBadge>
            <StatusBadge status="success">Success</StatusBadge>
          </div>
        </div>
      </div>

      <DataTable
        columns={demoColumns}
        data={demoRecords}
        initialPageSize={5}
        pageSizeOptions={[5, 10]}
        renderRowActions={(row) => (
          <Button size="sm" variant="outline">
            Abrir {row.original.name}
          </Button>
        )}
        tableDescription="Dados ficticios para validar densidade, filtros e acoes por linha."
        tableLabel="Registros de exemplo"
      />

      <ChartPanel
        ariaLabel="Grafico de volume por periodo"
        data={demoChartData}
        description="Series genericas para validar tooltip, eixo e legenda sem depender de dominio real."
        series={[
          { key: "done", label: "Concluidos" },
          { key: "backlog", label: "Pendentes" }
        ]}
        title="Volume por periodo"
        type="area"
        xAxisKey="period"
      />
    </section>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <div className="box-border mx-auto grid min-h-screen max-w-6xl gap-6 px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]">
          <nav
            aria-label="Navegacao principal"
            className="box-border min-w-0 rounded-md border border-slate-200 bg-white p-4"
          >
            <p className="mb-4 text-sm font-semibold text-slate-950">
              uiux-base demo
            </p>
            <div className="flex flex-col gap-2">
              <Link className={navLinkClass} to="/">
                Fundacao
              </Link>
              <Link className={navLinkClass} to="/packages">
                Pacotes
              </Link>
              <Link className={navLinkClass} to="/design-system">
                Design system
              </Link>
              <Link className={navLinkClass} to="/data-display">
                Data display
              </Link>
            </div>
          </nav>
          <main className="box-border min-w-0 rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <Routes>
              <Route element={<FoundationPage />} path="/" />
              <Route element={<PackagesPage />} path="/packages" />
              <Route element={<DesignSystemPage />} path="/design-system" />
              <Route element={<DataDisplayPage />} path="/data-display" />
            </Routes>
          </main>
        </div>
        <ToastProvider />
      </div>
    </BrowserRouter>
  );
}
