export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Contributor" | "Observer";
};

export type DemoOrganization = {
  id: string;
  name: string;
  region: "North" | "South" | "West";
  users: number;
};

export type DemoProject = {
  id: string;
  name: string;
  organization: string;
  owner: string;
  status: "Active" | "Paused" | "Blocked";
  progress: number;
};

export type DemoMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
  helperText: string;
};

export type DemoEvent = {
  id: string;
  title: string;
  tone: "Info" | "Success" | "Warning" | "Danger";
  count: number;
};

export type DemoRecord = {
  id: string;
  name: string;
  owner: string;
  status: "Active" | "Review" | "Failed";
  volume: number;
};

export type DemoChartPoint = {
  period: string;
  users: number;
  projects: number;
  events: number;
};

export const demoUsers: DemoUser[] = [
  {
    id: "demo-user-1",
    email: "jordan@example.test",
    name: "Jordan Smith",
    role: "Owner"
  },
  {
    id: "demo-user-2",
    email: "casey@example.test",
    name: "Casey Park",
    role: "Contributor"
  },
  {
    id: "demo-user-3",
    email: "taylor@example.test",
    name: "Taylor Chen",
    role: "Contributor"
  },
  {
    id: "demo-user-4",
    email: "riley@example.test",
    name: "Riley Brown",
    role: "Observer"
  }
];

export const demoOrganizations: DemoOrganization[] = [
  {
    id: "demo-org-1",
    name: "Atlas Group",
    region: "North",
    users: 18
  },
  {
    id: "demo-org-2",
    name: "Bright Studio",
    region: "South",
    users: 11
  },
  {
    id: "demo-org-3",
    name: "Cedar Works",
    region: "West",
    users: 24
  }
];

export const demoProjects: DemoProject[] = [
  {
    id: "demo-project-1",
    name: "Project Alpha",
    organization: "Atlas Group",
    owner: "Jordan Smith",
    progress: 88,
    status: "Active"
  },
  {
    id: "demo-project-2",
    name: "Project Beta",
    organization: "Bright Studio",
    owner: "Casey Park",
    progress: 54,
    status: "Paused"
  },
  {
    id: "demo-project-3",
    name: "Project Gamma",
    organization: "Cedar Works",
    owner: "Taylor Chen",
    progress: 33,
    status: "Blocked"
  },
  {
    id: "demo-project-4",
    name: "Project Delta",
    organization: "Atlas Group",
    owner: "Riley Brown",
    progress: 71,
    status: "Active"
  },
  {
    id: "demo-project-5",
    name: "Project Epsilon",
    organization: "Bright Studio",
    owner: "Jordan Smith",
    progress: 62,
    status: "Paused"
  },
  {
    id: "demo-project-6",
    name: "Project Zeta",
    organization: "Cedar Works",
    owner: "Casey Park",
    progress: 96,
    status: "Active"
  }
];

export const demoMetrics: DemoMetric[] = [
  {
    id: "demo-metric-1",
    helperText: "Usuarios ficticios para validar cards.",
    label: "Usuarios ativos",
    trend: "+9%",
    value: "4,280"
  },
  {
    id: "demo-metric-2",
    helperText: "Projetos de exemplo em varias fases.",
    label: "Projetos em foco",
    trend: "+6",
    value: "36"
  },
  {
    id: "demo-metric-3",
    helperText: "Eventos ficticios para testar estados.",
    label: "Eventos",
    trend: "+14%",
    value: "918"
  },
  {
    id: "demo-metric-4",
    helperText: "Taxa simulada de conclusao.",
    label: "Conclusao",
    trend: "+5%",
    value: "87%"
  },
  {
    id: "demo-metric-5",
    helperText: "Erros controlados para feedback visual.",
    label: "Alertas",
    trend: "-3",
    value: "7"
  }
];

export const demoEvents: DemoEvent[] = [
  { count: 24, id: "demo-event-1", title: "Importacoes concluidas", tone: "Success" },
  { count: 12, id: "demo-event-2", title: "Novas atribuicoes", tone: "Info" },
  { count: 5, id: "demo-event-3", title: "Revisoes pendentes", tone: "Warning" },
  { count: 2, id: "demo-event-4", title: "Falhas simuladas", tone: "Danger" },
  { count: 31, id: "demo-event-5", title: "Atualizacoes de status", tone: "Info" }
];

export const demoRecords: DemoRecord[] = [
  { id: "demo-record-1", name: "Record North", owner: "Jordan Smith", status: "Active", volume: 124 },
  { id: "demo-record-2", name: "Record South", owner: "Casey Park", status: "Review", volume: 86 },
  { id: "demo-record-3", name: "Record East", owner: "Taylor Chen", status: "Failed", volume: 42 },
  { id: "demo-record-4", name: "Record West", owner: "Riley Brown", status: "Active", volume: 158 },
  { id: "demo-record-5", name: "Record Central", owner: "Jordan Smith", status: "Review", volume: 97 },
  { id: "demo-record-6", name: "Record Remote", owner: "Casey Park", status: "Active", volume: 203 },
  { id: "demo-record-7", name: "Record Local", owner: "Taylor Chen", status: "Failed", volume: 64 },
  { id: "demo-record-8", name: "Record Shared", owner: "Riley Brown", status: "Active", volume: 139 }
];

export const demoChartData: DemoChartPoint[] = [
  { events: 112, period: "Jan", projects: 28, users: 320 },
  { events: 148, period: "Fev", projects: 31, users: 382 },
  { events: 136, period: "Mar", projects: 34, users: 421 },
  { events: 174, period: "Abr", projects: 36, users: 468 },
  { events: 192, period: "Mai", projects: 39, users: 512 }
];
