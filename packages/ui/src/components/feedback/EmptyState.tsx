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
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center",
        className
      )}
    >
      <Inbox aria-hidden="true" className="h-8 w-8 text-slate-400" />
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </section>
  );
}
