import type { ReactNode } from "react";

export type WorkspaceState = "ready" | "loading" | "empty" | "blocked" | "error";

export type WorkspaceStateNoticeProps = {
  state: WorkspaceState;
  action?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const workspaceDefaults: Record<
  Exclude<WorkspaceState, "ready">,
  { description: string; role: "alert" | "status"; title: string; wrapper: string }
> = {
  blocked: {
    description: "Complete a configuracao necessaria para liberar este workspace.",
    role: "alert",
    title: "Workspace bloqueado",
    wrapper: "border-amber-200 bg-amber-50 text-amber-950"
  },
  empty: {
    description: "Crie o primeiro registro para iniciar o fluxo de trabalho.",
    role: "status",
    title: "Workspace vazio",
    wrapper: "border-slate-200 bg-white text-slate-800"
  },
  error: {
    description: "Nao foi possivel carregar o estado atual do workspace.",
    role: "alert",
    title: "Falha no workspace",
    wrapper: "border-red-200 bg-red-50 text-red-950"
  },
  loading: {
    description: "Aguarde enquanto preparamos os dados do workspace.",
    role: "status",
    title: "Carregando workspace",
    wrapper: "border-blue-200 bg-blue-50 text-blue-950"
  }
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function WorkspaceStateNotice({
  action,
  className,
  description,
  state,
  title
}: WorkspaceStateNoticeProps) {
  if (state === "ready") {
    return null;
  }

  const defaults = workspaceDefaults[state];

  return (
    <section
      aria-live={defaults.role === "status" ? "polite" : undefined}
      className={cx("rounded-md border p-4 shadow-sm", defaults.wrapper, className)}
      role={defaults.role}
    >
      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-1">
          <h2 className="text-sm font-semibold">{title ?? defaults.title}</h2>
          <p className="text-sm leading-6">{description ?? defaults.description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </section>
  );
}
