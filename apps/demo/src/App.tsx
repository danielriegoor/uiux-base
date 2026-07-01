import {
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
  BlockedState,
  Button,
  ChartPanel,
  Checkbox,
  DataTable,
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
  toast,
  type DataTableProps,
  type StatusBadgeStatus
} from "@uiux-base/ui";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation
} from "react-router-dom";
import {
  demoChartData,
  demoMetrics,
  demoProjects,
  type DemoProject
} from "./fixtures";

const appMetadata = createAppMetadata({
  name: "Demo",
  packageName: "demo"
});

const navItems: NavigationItemInput[] = [
  { href: "/components", label: "Components" },
  { href: "/components/forms", label: "Forms" },
  { href: "/components/feedback", label: "Feedback" },
  { href: "/components/data-table", label: "Data table" },
  { href: "/components/charts", label: "Charts" },
  { href: "/patterns/dashboard-shell", label: "Dashboard shell" },
  { href: "/patterns/states", label: "States" }
];

const projectColumns: DataTableProps<DemoProject>["columns"] = [
  { accessorKey: "name", header: "Projeto" },
  { accessorKey: "organization", header: "Organizacao" },
  { accessorKey: "owner", header: "Owner" },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      const tone: StatusBadgeStatus =
        status === "Active" ? "success" : status === "Paused" ? "warning" : "danger";

      return <StatusBadge status={tone}>{status}</StatusBadge>;
    },
    header: "Status"
  },
  {
    accessorKey: "progress",
    cell: ({ row }) => `${row.original.progress}%`,
    header: "Progresso"
  }
];

function ComponentsPage() {
  return (
    <TooltipProvider delayDuration={0}>
      <DashboardContent
        description="Vitrine tecnica dos primitives, data display e feedback do pacote UI."
        title="Components"
      >
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {demoMetrics.slice(0, 4).map((metric) => (
              <KpiCard
                helperText={metric.helperText}
                key={metric.id}
                label={metric.label}
                trend={metric.trend}
                value={metric.value}
              />
            ))}
          </div>

          <Tabs defaultValue="actions">
            <TabsList aria-label="Componentes em destaque">
              <TabsTrigger value="actions">Acoes</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="package">Package</TabsTrigger>
            </TabsList>

            <TabsContent value="actions">
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Abrir dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar exemplo</DialogTitle>
                      <DialogDescription>
                        Dialog generico para validar foco, leitura por screen
                        reader e fechamento por teclado.
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
                        toast.success("Acao generica executada");
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

            <TabsContent value="badges">
              <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-4">
                <StatusBadge status="success">Active</StatusBadge>
                <StatusBadge status="warning">Review</StatusBadge>
                <StatusBadge status="danger">Failed</StatusBadge>
                <StatusBadge status="info">Info</StatusBadge>
                <StatusBadge status="neutral">Neutral</StatusBadge>
              </div>
            </TabsContent>

            <TabsContent value="package">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <UiFoundationMark />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardContent>
    </TooltipProvider>
  );
}

function FormsPage() {
  return (
    <DashboardContent
      description="Campos genericos com labels persistentes, hints e barra de envio."
      title="Forms"
    >
      <FormSection
        description="Formulario sem submissao real. Troque o estado local por API quando houver backend."
        title="Registro generico"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FieldGroup htmlFor="record-title" label="Titulo do registro">
            <Input id="record-title" placeholder="Registro exemplo" />
          </FieldGroup>
          <FieldGroup htmlFor="record-status" label="Status">
            <Select defaultValue="active">
              <SelectTrigger id="record-status">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
        <FieldGroup htmlFor="record-notes" label="Notas">
          <Textarea
            id="record-notes"
            placeholder="Notas curtas para demonstrar textarea"
          />
        </FieldGroup>
        <label className="flex min-h-11 items-center gap-2 text-sm text-slate-700">
          <Checkbox aria-label="Receber atualizacoes" />
          Receber atualizacoes deste registro
        </label>
        <SubmitBar cancelLabel="Cancelar" submitLabel="Salvar exemplo" />
      </FormSection>
    </DashboardContent>
  );
}

function FeedbackPage() {
  return (
    <DashboardContent
      description="Estados de feedback reutilizaveis para operacoes assincronas e dados ausentes."
      title="Feedback"
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <LoadingState
          description="Use enquanto dados reais estiverem em transito."
          title="Carregando dados genericos"
        />
        <EmptyState
          action={<Button>Novo exemplo</Button>}
          description="Estado vazio com acao clara."
          title="Nenhum resultado generico"
        />
        <ErrorState
          action={<Button variant="outline">Tentar novamente</Button>}
          description="Erro de exemplo com recuperacao visivel."
          title="Falha simulada"
        />
        <BlockedState
          action={<Button variant="outline">Solicitar acesso</Button>}
          description="Bloqueio visual sem auth real."
          title="Area bloqueada"
        />
      </div>
    </DashboardContent>
  );
}

function DataTablePage() {
  return (
    <DashboardContent
      description="Tabela com busca, sorting, paginacao e acoes por linha."
      title="Data table"
    >
      <DataTable
        columns={projectColumns}
        data={demoProjects}
        initialPageSize={5}
        pageSizeOptions={[5, 10]}
        renderRowActions={(row) => (
          <Button size="sm" variant="outline">
            Abrir {row.original.name}
          </Button>
        )}
        tableDescription="Projetos ficticios para validar densidade, overflow e responsividade."
        tableLabel="Projetos genericos"
      />
    </DashboardContent>
  );
}

function ChartsPage() {
  return (
    <DashboardContent
      description="Graficos de area, linha e barras com series textuais acessiveis."
      title="Charts"
    >
      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <ChartPanel
          ariaLabel="Grafico de metricas genericas"
          data={demoChartData}
          description="Series ficticias de usuarios, projetos e eventos."
          series={[
            { key: "users", label: "Usuarios" },
            { key: "projects", label: "Projetos" },
            { key: "events", label: "Eventos" }
          ]}
          title="Metricas por periodo"
          type="area"
          xAxisKey="period"
        />
        <ChartPanel
          data={demoChartData}
          description="Mesmo dataset em barras para comparar densidade visual."
          series={[
            { key: "projects", label: "Projetos" },
            { key: "events", label: "Eventos" }
          ]}
          title="Comparativo"
          type="bar"
          xAxisKey="period"
        />
      </div>
    </DashboardContent>
  );
}

function DashboardShellPage() {
  return (
    <DashboardContent
      description="A propria demo usa DashboardShell, Sidebar, Topbar e StatusBar do app-kit."
      title="Dashboard shell"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Package</p>
          <h2 className="mt-2 text-lg font-semibold text-slate-950">
            @uiux-base/app-kit
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Shell, navegacao e status bar ficam fora de qualquer dominio.
          </p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Rotas</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {navItems.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Todos os links sao rotas reais do React Router.
          </p>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Workspace</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">
            {workspaceConfig.packages.length}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Pacotes reutilizados sem criar dependencia circular.
          </p>
        </section>
      </div>
    </DashboardContent>
  );
}

function StatesPage() {
  return (
    <DashboardContent
      description="Padroes visuais de guards e estados do app-kit com conteudo generico."
      title="States"
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <RequireAccess status="loading">
          <p>Conteudo liberado</p>
        </RequireAccess>
        <RequireAccess status="denied">
          <p>Conteudo protegido</p>
        </RequireAccess>
        <WorkspaceStateNotice state="blocked" />
        <GuardNotice
          action={<Button variant="outline">Revisar acesso</Button>}
          description="Use este bloco quando uma feature depender de configuracao visual."
          title="Acesso visual bloqueado"
          variant="blocked"
        />
      </div>
    </DashboardContent>
  );
}

function DemoShell() {
  const location = useLocation();
  const routeNav = createRouteNav(navItems, location.pathname);

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          brand="uiux-base demo"
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
            { label: "App", value: appMetadata.packageName },
            { label: "UI", tone: "success", value: "@uiux-base/ui" },
            { label: "App kit", value: "@uiux-base/app-kit" }
          ]}
        />
      }
      topbar={
        <Topbar
          description="Vitrine tecnica para validar packages reutilizaveis, estados e responsividade."
          eyebrow="PRD 0005"
          title="Demo app"
        />
      }
    >
      <Routes>
        <Route element={<Navigate replace to="/components" />} path="/" />
        <Route element={<ComponentsPage />} path="/components" />
        <Route element={<FormsPage />} path="/components/forms" />
        <Route element={<FeedbackPage />} path="/components/feedback" />
        <Route element={<DataTablePage />} path="/components/data-table" />
        <Route element={<ChartsPage />} path="/components/charts" />
        <Route element={<DashboardShellPage />} path="/patterns/dashboard-shell" />
        <Route element={<StatesPage />} path="/patterns/states" />
        <Route element={<Navigate replace to="/components" />} path="*" />
      </Routes>
      <ToastProvider />
    </DashboardShell>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <DemoShell />
    </BrowserRouter>
  );
}
