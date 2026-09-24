import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type KpiCardProps = {
  label: string;
  value: ReactNode;
  trend?: ReactNode;
  helperText?: ReactNode;
  className?: string;
};

export function KpiCard({
  className,
  helperText,
  label,
  trend,
  value
}: KpiCardProps) {
  return (
    <article
      className={cn(
        "box-border min-w-0 rounded-lg border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] p-4 shadow-sm",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--ui-text-muted)]">{label}</p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-[var(--ui-text-strong)]">
            {value}
          </p>
        </div>
        {trend ? (
          <p className="rounded-full bg-[var(--ui-success-surface)] px-2 py-1 text-xs font-medium text-[var(--ui-success-text)]">
            {trend}
          </p>
        ) : null}
      </div>
      {helperText ? (
        <p className="mt-3 text-sm leading-6 text-[var(--ui-text-muted)]">{helperText}</p>
      ) : null}
    </article>
  );
}
