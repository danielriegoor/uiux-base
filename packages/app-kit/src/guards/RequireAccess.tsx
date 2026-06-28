import type { ReactNode } from "react";
import { GuardNotice } from "./GuardNotice";

export type AccessStatus = "allowed" | "loading" | "denied" | "blocked";

export type RequireAccessProps = {
  children: ReactNode;
  status?: AccessStatus;
  deniedTitle?: string;
  deniedDescription?: string;
  loadingTitle?: string;
  loadingDescription?: string;
  blockedTitle?: string;
  blockedDescription?: string;
  action?: ReactNode;
};

export function RequireAccess({
  action,
  blockedDescription,
  blockedTitle,
  children,
  deniedDescription,
  deniedTitle,
  loadingDescription,
  loadingTitle,
  status = "allowed"
}: RequireAccessProps) {
  if (status === "allowed") {
    return <>{children}</>;
  }

  if (status === "loading") {
    return (
      <GuardNotice
        description={loadingDescription}
        title={loadingTitle}
        variant="loading"
      />
    );
  }

  if (status === "blocked") {
    return (
      <GuardNotice
        action={action}
        description={blockedDescription}
        title={blockedTitle}
        variant="blocked"
      />
    );
  }

  return (
    <GuardNotice
      action={action}
      description={deniedDescription}
      title={deniedTitle}
      variant="denied"
    />
  );
}
