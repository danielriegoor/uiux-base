import type { ReactNode } from "react";

export type GuardNoticeVariant = "loading" | "denied" | "blocked";

export type GuardNoticeProps = {
  variant: GuardNoticeVariant;
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

const guardDefaults: Record<
  GuardNoticeVariant,
  { description: string; role: "alert" | "status"; title: string; wrapper: string }
> = {
  blocked: {
    description: "Esta area depende de uma configuracao antes de continuar.",
    role: "alert",
    title: "Acesso bloqueado",
    wrapper: "border-amber-200 bg-amber-50 text-amber-950"
  },
  denied: {
    description: "Voce nao tem permissao para visualizar esta area.",
    role: "alert",
    title: "Acesso negado",
    wrapper: "border-red-200 bg-red-50 text-red-950"
  },
  loading: {
    description: "Aguarde enquanto validamos as condicoes de entrada.",
    role: "status",
    title: "Verificando acesso",
    wrapper: "border-blue-200 bg-blue-50 text-blue-950"
  }
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function GuardNotice({
  action,
  className,
  description,
  title,
  variant
}: GuardNoticeProps) {
  const defaults = guardDefaults[variant];

  return (
    <section
      aria-live={defaults.role === "status" ? "polite" : undefined}
      className={cx(
        "min-w-0 rounded-md border p-4 shadow-sm",
        defaults.wrapper,
        className
      )}
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
