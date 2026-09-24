import {
  AppStateBoundary,
  DashboardContent,
  DashboardShell,
  Sidebar,
  StatusBar,
  Topbar,
  createAppMetadata,
  createRouteNav,
  type NavigationItemInput,
  BlockedState,
  Button,
  Checkbox,
  DataTable,
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
  Textarea,
  UiFoundationMark,
  type DataTableProps,
  type StatusBadgeStatus
} from "uiux-base";
import { workspaceConfig } from "@uiux-base/config";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import {
  dashboardMetrics,
  eventFixtures,
  organizationFixtures,
  projectFixtures,
  recordFixtures,
  starterSettingsFixture,
  userFixtures,
  type RecordFixture
} from "./fixtures";

const appMetadata = createAppMetadata({
  name: "Starter",
  packageName: "starter"
});

const navItems: NavigationItemInput[] = [
  {
    href: "/dashboard",
    label: "Dashboard"
  },
  {
    href: "/dashboard/overview",
    label: "Overview"
  },
  {
    href: "/dashboard/records",
    label: "Records"
  },
  {
    href: "/dashboard/settings",
    label: "Settings"
  }
];

const recordColumns: DataTableProps<RecordFixture>["columns"] = [
  {
    accessorKey: "title",
    header: "Registro"
  },
  {
    accessorKey: "owner",
    header: "Owner"
  },
  {
    accessorKey: "organization",
    header: "Organizacao"
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const tone: StatusBadgeStatus =
        status === "Ready" ? "success" : status === "Review" ? "warning" : "danger";

      return <StatusBadge status={tone}>{status}</StatusBadge>;
    },
    header: "Status"
  },
  {
    accessorKey: "priority",
    header: "Prioridade"
  },
  {
    accessorKey: "total",
    cell: ({ row }) => row.original.total.toLocaleString("en-US"),
    header: "Total"
  }
];

function DashboardPage() {
  return (
    <DashboardContent
      description="Experiencia inicial de app React/Vite com shell, indicadores, estados e dados ficticios locais."
      title="Dashboard"
      actions={
        <Button asChild variant="outline">
          <Link to="/dashboard/settings">Ajustar template</Link>
        </Button>
      }
    >
      <div className="space-y-5">
        <section aria-labelledby="starter-indicators" className="space-y-3">
          <div className="flex min-w-0 flex-col gap-1">
            <h2
              className="text-sm font-semibold uppercase text-[var(--ui-text-muted)]"
              id="starter-indicators"
            >
              Indicadores
            </h2>
            <p className="text-sm leading-6 text-[var(--ui-text-body)]">
              Cards numericos reutilizando fixtures locais, sem backend real.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <KpiCard
                helperText={metric.helperText}
                key={metric.id}
                label={metric.label}
                trend={metric.trend}
                value={metric.value}
              />
            ))}
          </div>
        </section>

          <section className="min-w-0 rounded-lg border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-[var(--ui-text-strong)]">
              Estados do template
            </h2>
            <div className="mt-4 grid gap-3">
              <LoadingState
                description="Exemplo visual para dados em transito."
                title="Carregando registros"
              />
              <EmptyState
                description="Use quando a API real retornar uma lista vazia."
                title="Nenhum evento encontrado"
              />
              <ErrorState
                description="Mensagem generica com caminho de recuperacao."
                title="Falha ao buscar metricas"
              />
              <BlockedState
                description="Estado visual, sem auth real ou permissao persistida."
                title="Workspace bloqueado"
              />
            </div>
          </section>
      </div>
    </DashboardContent>
  );
}

function OverviewPage() {
  return (
    <DashboardContent
      description="Resumo das colecoes de fixtures que o template fornece para prototipar telas sem dominio especifico."
      title="Overview"
    >
      <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.55fr)]">
        <section className="min-w-0 rounded-lg border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--ui-text-strong)]">
            Colecoes genericas
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[var(--ui-border-default)] p-3">
              <dt className="text-sm text-[var(--ui-text-muted)]">Usuarios</dt>
              <dd className="text-xl font-semibold text-[var(--ui-text-strong)]">
                {userFixtures.length}
              </dd>
            </div>
            <div className="rounded-md border border-[var(--ui-border-default)] p-3">
              <dt className="text-sm text-[var(--ui-text-muted)]">Organizacoes</dt>
              <dd className="text-xl font-semibold text-[var(--ui-text-strong)]">
                {organizationFixtures.length}
              </dd>
            </div>
            <div className="rounded-md border border-[var(--ui-border-default)] p-3">
              <dt className="text-sm text-[var(--ui-text-muted)]">Projetos</dt>
              <dd className="text-xl font-semibold text-[var(--ui-text-strong)]">
                {projectFixtures.length}
              </dd>
            </div>
            <div className="rounded-md border border-[var(--ui-border-default)] p-3">
              <dt className="text-sm text-[var(--ui-text-muted)]">Eventos</dt>
              <dd className="text-xl font-semibold text-[var(--ui-text-strong)]">
                {eventFixtures.length}
              </dd>
            </div>
          </dl>
        </section>

        <section className="min-w-0 rounded-lg border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--ui-text-strong)]">Base ativa</h2>
          <div className="mt-4 space-y-4">
            <UiFoundationMark />
            <p className="text-sm leading-6 text-[var(--ui-text-body)]">
              Para trocar fixtures por API real, siga{" "}
              <code className="rounded bg-[var(--ui-surface-muted)] px-1 py-0.5 text-xs">
                docs/fixtures-para-api-real.md
              </code>
              .
            </p>
          </div>
        </section>
      </div>
    </DashboardContent>
  );
}

function RecordsPage() {
  return (
    <DashboardContent
      description="Tabela generica com busca, sorting, paginacao e acoes por linha."
      title="Records"
    >
      <DataTable
        columns={recordColumns}
        data={recordFixtures}
        initialPageSize={5}
        pageSizeOptions={[5, 10]}
        renderRowActions={(row) => (
          <Button size="sm" variant="outline">
            Abrir {row.original.title}
          </Button>
        )}
        searchPlaceholder="Filtrar registros..."
        tableDescription="Dados ficticios para validar layout denso, overflow horizontal e controles acessiveis."
        tableLabel="Registros genericos"
      />
    </DashboardContent>
  );
}

function SettingsPage() {
  return (
    <DashboardContent
      description="Formulario local para demonstrar campos, selects e preferencias sem persistencia externa."
      title="Settings"
    >
      <FormSection
        description="Substitua estes valores por dados da API real quando o produto estiver conectado."
        title="Preferencias do workspace"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup
            hint="Nome exibido no shell e nos metadados do app."
            htmlFor="workspace-name"
            label="Nome do workspace"
          >
            <Input
              defaultValue={starterSettingsFixture.workspaceName}
              id="workspace-name"
            />
          </FieldGroup>
          <FieldGroup htmlFor="default-view" label="Tela inicial">
            <Select defaultValue="dashboard">
              <SelectTrigger id="default-view">
                <SelectValue placeholder="Selecione a tela" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Dashboard</SelectItem>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="records">Records</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
        <FieldGroup
          hint="Use dominio .test em fixtures para evitar dados reais."
          htmlFor="notification-email"
          label="Email de notificacao"
        >
          <Input
            defaultValue={starterSettingsFixture.notificationEmail}
            id="notification-email"
            type="email"
          />
        </FieldGroup>
        <FieldGroup htmlFor="workspace-notes" label="Notas">
          <Textarea
            defaultValue="Fixture local usada somente para desenvolvimento visual."
            id="workspace-notes"
          />
        </FieldGroup>
        <label className="flex min-h-11 items-center gap-2 text-sm text-[var(--ui-text-body)]">
          <Checkbox aria-label="Receber resumo semanal" defaultChecked />
          Receber resumo semanal deste workspace
        </label>
        <SubmitBar cancelLabel="Descartar" submitLabel="Salvar exemplo" />
      </FormSection>
    </DashboardContent>
  );
}

function StarterShell() {
  const location = useLocation();
  const routeNav = createRouteNav(navItems, location.pathname);

  return (
    <DashboardShell
      mobileBrand="uiux-base starter"
      sidebar={
        <Sidebar
          brand="uiux-base starter"
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
              label: "Pacotes",
              value: workspaceConfig.packages.length
            }
          ]}
        />
      }
      topbar={
        <Topbar
          actions={
            <AppStateBoundary accessStatus="allowed" workspaceState="ready">
              <StatusBadge status="success">Ready</StatusBadge>
            </AppStateBoundary>
          }
          description="Template neutro para iniciar produtos internos com rotas, states e fixtures substituiveis."
          eyebrow="uiux-base"
          title="Starter app"
        />
      }
    >
      <Routes>
        <Route element={<Navigate replace to="/dashboard" />} path="/" />
        <Route element={<DashboardPage />} path="/dashboard" />
        <Route element={<OverviewPage />} path="/dashboard/overview" />
        <Route element={<RecordsPage />} path="/dashboard/records" />
        <Route element={<SettingsPage />} path="/dashboard/settings" />
        <Route element={<Navigate replace to="/dashboard" />} path="*" />
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
