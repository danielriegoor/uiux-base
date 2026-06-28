import type { ReactNode } from "react";
import type { AccessStatus } from "../guards/RequireAccess";
import { RequireAccess } from "../guards/RequireAccess";
import type { WorkspaceState } from "./WorkspaceStateNotice";
import { WorkspaceStateNotice } from "./WorkspaceStateNotice";

export type AppStateBoundaryProps = {
  children: ReactNode;
  accessStatus?: AccessStatus;
  workspaceState?: WorkspaceState;
  accessAction?: ReactNode;
  workspaceAction?: ReactNode;
};

export function AppStateBoundary({
  accessAction,
  accessStatus = "allowed",
  children,
  workspaceAction,
  workspaceState = "ready"
}: AppStateBoundaryProps) {
  return (
    <RequireAccess action={accessAction} status={accessStatus}>
      {workspaceState === "ready" ? (
        children
      ) : (
        <WorkspaceStateNotice action={workspaceAction} state={workspaceState} />
      )}
    </RequireAccess>
  );
}
