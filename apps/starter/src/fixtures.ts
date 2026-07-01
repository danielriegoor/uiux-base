export type FixtureUser = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Editor" | "Viewer";
};

export type FixtureOrganization = {
  id: string;
  name: string;
  plan: "Free" | "Team" | "Scale";
  ownerId: string;
};

export type FixtureProject = {
  id: string;
  name: string;
  organizationId: string;
  ownerId: string;
  progress: number;
  status: "Active" | "Review" | "Blocked";
};

export type DashboardMetric = {
  id: string;
  label: string;
  value: string;
  trend: string;
  helperText: string;
};

export type EventFixture = {
  id: string;
  title: string;
  category: "System" | "Project" | "User";
  count: number;
  period: string;
};

export type RecordFixture = {
  id: string;
  title: string;
  owner: string;
  organization: string;
  status: "Ready" | "Review" | "Blocked";
  priority: "High" | "Medium" | "Low";
  updatedAt: string;
  total: number;
};

export type TimeSeriesPoint = {
  period: string;
  created: number;
  resolved: number;
  reviewed: number;
};

export const userFixtures: FixtureUser[] = [
  {
    id: "user-1",
    email: "alex@example.test",
    name: "Alex Rivera",
    role: "Owner"
  },
  {
    id: "user-2",
    email: "sam@example.test",
    name: "Sam Kim",
    role: "Editor"
  },
  {
    id: "user-3",
    email: "morgan@example.test",
    name: "Morgan Lee",
    role: "Viewer"
  }
];

export const organizationFixtures: FixtureOrganization[] = [
  {
    id: "org-1",
    name: "Acme Workspace",
    ownerId: "user-1",
    plan: "Team"
  },
  {
    id: "org-2",
    name: "Northstar Labs",
    ownerId: "user-2",
    plan: "Scale"
  }
];

export const projectFixtures: FixtureProject[] = [
  {
    id: "project-1",
    name: "Operations Starter",
    organizationId: "org-1",
    ownerId: "user-1",
    progress: 82,
    status: "Active"
  },
  {
    id: "project-2",
    name: "Data Review",
    organizationId: "org-1",
    ownerId: "user-2",
    progress: 64,
    status: "Review"
  },
  {
    id: "project-3",
    name: "Experience Audit",
    organizationId: "org-2",
    ownerId: "user-3",
    progress: 38,
    status: "Blocked"
  },
  {
    id: "project-4",
    name: "Release Checklist",
    organizationId: "org-2",
    ownerId: "user-1",
    progress: 91,
    status: "Active"
  }
];

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "metric-1",
    helperText: "Registros ficticios prontos para revisao.",
    label: "Registros ativos",
    trend: "+12%",
    value: "1,248"
  },
  {
    id: "metric-2",
    helperText: "Projetos de exemplo em andamento.",
    label: "Projetos",
    trend: "+4",
    value: "24"
  },
  {
    id: "metric-3",
    helperText: "Eventos gerados por fixtures locais.",
    label: "Eventos semanais",
    trend: "+18%",
    value: "386"
  },
  {
    id: "metric-4",
    helperText: "Media ficticia de conclusao.",
    label: "Tempo medio",
    trend: "-9%",
    value: "2.4d"
  }
];

export const eventFixtures: EventFixture[] = [
  {
    id: "event-1",
    category: "System",
    count: 42,
    period: "Hoje",
    title: "Sincronizacoes concluidas"
  },
  {
    id: "event-2",
    category: "Project",
    count: 18,
    period: "Hoje",
    title: "Projetos atualizados"
  },
  {
    id: "event-3",
    category: "User",
    count: 11,
    period: "Semana",
    title: "Novos participantes"
  },
  {
    id: "event-4",
    category: "System",
    count: 3,
    period: "Semana",
    title: "Alertas pendentes"
  }
];

export const recordFixtures: RecordFixture[] = [
  {
    id: "record-1",
    organization: "Acme Workspace",
    owner: "Alex Rivera",
    priority: "High",
    status: "Ready",
    title: "Registro Alpha",
    total: 128,
    updatedAt: "2026-06-26"
  },
  {
    id: "record-2",
    organization: "Acme Workspace",
    owner: "Sam Kim",
    priority: "Medium",
    status: "Review",
    title: "Registro Beta",
    total: 84,
    updatedAt: "2026-06-27"
  },
  {
    id: "record-3",
    organization: "Northstar Labs",
    owner: "Morgan Lee",
    priority: "Low",
    status: "Blocked",
    title: "Registro Gamma",
    total: 41,
    updatedAt: "2026-06-28"
  },
  {
    id: "record-4",
    organization: "Northstar Labs",
    owner: "Alex Rivera",
    priority: "High",
    status: "Ready",
    title: "Registro Delta",
    total: 162,
    updatedAt: "2026-06-29"
  },
  {
    id: "record-5",
    organization: "Acme Workspace",
    owner: "Morgan Lee",
    priority: "Medium",
    status: "Review",
    title: "Registro Epsilon",
    total: 97,
    updatedAt: "2026-06-30"
  },
  {
    id: "record-6",
    organization: "Northstar Labs",
    owner: "Sam Kim",
    priority: "Low",
    status: "Ready",
    title: "Registro Zeta",
    total: 74,
    updatedAt: "2026-07-01"
  }
];

export const timeSeriesFixtures: TimeSeriesPoint[] = [
  { created: 24, period: "S1", resolved: 18, reviewed: 12 },
  { created: 31, period: "S2", resolved: 22, reviewed: 16 },
  { created: 28, period: "S3", resolved: 26, reviewed: 21 },
  { created: 36, period: "S4", resolved: 32, reviewed: 24 },
  { created: 42, period: "S5", resolved: 35, reviewed: 29 },
  { created: 39, period: "S6", resolved: 37, reviewed: 31 }
];

export const starterSettingsFixture = {
  defaultView: "Dashboard",
  notificationEmail: "workspace@example.test",
  workspaceName: "Acme Workspace"
};
