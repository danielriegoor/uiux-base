export type AppMetadataStatus = "foundation-ready";

export type AppMetadataInput = {
  name: string;
  packageName: string;
};

export type AppMetadata = AppMetadataInput & {
  status: AppMetadataStatus;
};

export function createAppMetadata(input: AppMetadataInput): AppMetadata {
  return {
    ...input,
    status: "foundation-ready"
  };
}

export {
  DashboardContent,
  type DashboardContentProps
} from "./layout/DashboardContent";
export {
  DashboardShell,
  type DashboardShellProps
} from "./layout/DashboardShell";
export { Sidebar, type SidebarProps } from "./layout/Sidebar";
export {
  StatusBar,
  type StatusBarItem,
  type StatusBarProps,
  type StatusBarTone
} from "./layout/StatusBar";
export { Topbar, type TopbarProps } from "./layout/Topbar";
export {
  createRouteNav
} from "./navigation/routeNav";
export type {
  NavigationItem,
  NavigationItemInput
} from "./navigation/types";
export {
  GuardNotice,
  type GuardNoticeProps,
  type GuardNoticeVariant
} from "./guards/GuardNotice";
export {
  RequireAccess,
  type AccessStatus,
  type RequireAccessProps
} from "./guards/RequireAccess";
export {
  AppStateBoundary,
  type AppStateBoundaryProps
} from "./states/AppStateBoundary";
export {
  WorkspaceStateNotice,
  type WorkspaceState,
  type WorkspaceStateNoticeProps
} from "./states/WorkspaceStateNotice";
export {
  useAsyncState,
  type AsyncState,
  type AsyncStatus,
  type UseAsyncStateResult
} from "./hooks/useAsyncState";
export {
  useDisclosure,
  type UseDisclosureOptions,
  type UseDisclosureResult
} from "./hooks/useDisclosure";
