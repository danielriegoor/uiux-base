import {
  AppStateBoundary,
  DashboardContent,
  DashboardShell,
  GuardNotice,
  RequireAccess,
  Sidebar,
  StatusBar,
  Topbar,
  WorkspaceStateNotice,
  createAppMetadata,
  createRouteNav,
  type NavigationItemInput
} from "@uiux-base/app-kit";
import { workspaceConfig } from "@uiux-base/config";
import {
  Button,
  ChartPanel,
  DataTable,
  StatusBadge,
  UiFoundationMark,
  type DataTableProps
} from "@uiux-base/ui";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

const appMetadata = createAppMetadata({
  name: "Starter",
  packageName: "starter"
});

const navItems: NavigationItemInput[] = [
  { href: "/", label: "Visao geral" },
  { href: "/status", label: "Status" },
  { href: "/estados", label: "Estados" },
  { href: "/dados", label: "Dados" }
];

type StarterRecord = {
  id: string;
  name: string;
  priority: "Alta" | "Media" | "Baixa";
  status: "Pronto" | "Em revisao" | "Pausado";
  total: number;
};

const starterRecords: StarterRecord[] = [
  {
    id: "task-1",
    name: "Fluxo inicial",
    priority: "Alta",
    status: "Pronto",
    total: 32
  },
  {
    id: "task-2",
    name: "Revisao visual",
    priority: "Media",
    status: "Em revisao",
    total: 18
  },
  {
    id: "task-3",
    name: "Checklist QA",
    priority: "Baixa",
    status: "Pausado",
    total: 9
  },
  {
    id: "task-4",
    name: "Ajustes finais",
    priority: "Alta",
    status: "Pronto",
    total: 41
  }
];

const starterColumns: DataTableProps<StarterRecord>["columns"] = [
  {
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "priority",
    header: "Prioridade"
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const badgeStatus =
        status === "Pronto" ? "success" : status === "Em revisao" ? "warning" : "neutral";

      return <StatusBadge status={badgeStatus}>{status}</StatusBadge>;
    },
    header: "Status"
  },
  {
    accessorKey: "total",
    header: "Total"
  }
];

const starterChartData = [
  { period: "S1", created: 24, closed: 18 },
  { period: "S2", created: 28, closed: 22 },
  { period: "S3", created: 22, closed: 26 },
  { period: "S4", created: 31, closed: 29 }
];

function OverviewPage() {
  return (
    <DashboardContent
      description="Base minima para iniciar uma experiencia de aplicacao React/Vite com rotas, workspace packages e validacao automatizada."
      title="Starter operacional"
    >
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.65fr)]">
        <section className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium uppercase text-slate-500">
            Fila de trabalho
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">
            Experiencia inicial de app
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            O starter abre direto em uma superficie operacional com navegacao,
            area principal e estados de sistema visiveis.
          </p>
          <div className="mt-4">
            <UiFoundationMark />
          </div>
        </section>

        <section className="min-w-0 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pacotes ativos</p>
          <dl className="mt-3 space-y-3">
            <div>
              <dt className="text-xs uppercase text-slate-500">App</dt>
              <dd className="text-sm font-semibold text-slate-950">
                {appMetadata.packageName}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-slate-500">Workspace</dt>
              <dd className="text-sm font-semibold text-emerald-700">
                {workspaceConfig.packages.length} pacotes
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </DashboardContent>
  );
}

function StatusPage() {
  return (
    <DashboardContent
      description="Indicadores neutros do template, sem dependencia de backend real."
      title="Status da fundacao"
    >
      <dl className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <dt className="text-sm text-slate-500">Estado</dt>
          <dd className="text-lg font-semibold text-emerald-700">
            {appMetadata.status}
          </dd>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-4">
          <dt className="text-sm text-slate-500">Scripts raiz</dt>
          <dd className="text-lg font-semibold text-slate-950">
            {workspaceConfig.requiredRootScripts.length}
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <AppStateBoundary accessStatus="allowed" workspaceState="ready">
          <p className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
            Workspace de exemplo pronto para uso local.
          </p>
        </AppStateBoundary>
      </div>
    </DashboardContent>
  );
}

function StatesPage() {
  return (
    <DashboardContent
      description="Exemplos visuais genericos para loading, acesso negado e workspace bloqueado."
      title="Estados do app"
    >
      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <RequireAccess status="loading">
          <p>Conteudo carregado</p>
        </RequireAccess>
        <RequireAccess status="denied">
          <p>Conteudo protegido</p>
        </RequireAccess>
        <WorkspaceStateNotice state="blocked" />
      </div>
      <div className="mt-4">
        <GuardNotice
          action={<Button variant="outline">Revisar configuracao</Button>}
          description="Use este bloco quando uma feature depender de setup do workspace."
          title="Feature aguardando setup"
          variant="blocked"
        />
      </div>
    </DashboardContent>
  );
}

function DataPage() {
  return (
    <DashboardContent
      description="Tabela e grafico genericos para iniciar features com dados densos sem backend real."
      title="Dados operacionais"
    >
      <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <DataTable
          columns={starterColumns}
          data={starterRecords}
          initialPageSize={4}
          pageSizeOptions={[4, 8]}
          renderRowActions={(row) => (
            <Button size="sm" variant="outline">
              Ver {row.original.name}
            </Button>
          )}
          tableLabel="Registros operacionais"
        />
        <ChartPanel
          ariaLabel="Grafico operacional"
          data={starterChartData}
          description="Series ficticias para validar responsividade do starter."
          series={[
            { key: "created", label: "Criados" },
            { key: "closed", label: "Fechados" }
          ]}
          title="Fluxo semanal"
          type="bar"
          xAxisKey="period"
        />
      </div>
    </DashboardContent>
  );
}

function StarterShell() {
  const location = useLocation();
  const routeNav = createRouteNav(navItems, location.pathname);

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          brand="uiux-base"
          items={routeNav}
          renderLink={(item, { ariaCurrent, children, className }) => (
            <Link aria-current={ariaCurrent} className={className} to={item.href}>
              {children}
            </Link>
          )}
        />
      }
      statusBar={
        <StatusBar
          items={[
            { label: "Workspace", tone: "success", value: "Ativo" },
            { label: "App", value: appMetadata.packageName },
            {
              label: "Scripts",
              value: workspaceConfig.requiredRootScripts.length
            }
          ]}
        />
      }
      topbar={
        <Topbar
          description="Template neutro para produtos internos com shell, guards e features organizadas."
          eyebrow="@uiux-base/app-kit"
          title="uiux-base starter"
        />
      }
    >
      <Routes>
        <Route element={<OverviewPage />} path="/" />
        <Route element={<StatusPage />} path="/status" />
        <Route element={<StatesPage />} path="/estados" />
        <Route element={<DataPage />} path="/dados" />
      </Routes>
    </DashboardShell>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <StarterShell />
    </BrowserRouter>
  );
}
