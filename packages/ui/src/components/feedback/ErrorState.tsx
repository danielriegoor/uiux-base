import { AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type ErrorStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({
  action,
  className,
  description = "Nao foi possivel completar a acao. Tente novamente.",
  title
}: ErrorStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-[var(--ui-danger-border)] bg-[var(--ui-danger-surface)] p-4 text-[var(--ui-danger-text)]",
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5" />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">{title}</h2>
          {description ? <p className="text-sm leading-6">{description}</p> : null}
        </div>
      </div>
      {action ? <div className="pl-8">{action}</div> : null}
    </section>
  );
}
