import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  action,
  className,
  description = "Ainda nao ha itens para exibir.",
  title
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] p-8 text-center",
        className
      )}
    >
      <Inbox aria-hidden="true" className="h-8 w-8 text-[var(--ui-text-subtle)]" />
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-[var(--ui-text-strong)]">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-[var(--ui-text-muted)]">{description}</p>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </section>
  );
}
