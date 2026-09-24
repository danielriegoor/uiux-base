import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type StatusBadgeStatus =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type StatusBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  status?: StatusBadgeStatus;
};

const statusClasses: Record<StatusBadgeStatus, string> = {
  neutral: "border-[var(--ui-border-default)] bg-[var(--ui-surface-subtle)] text-[var(--ui-text-body)]",
  info: "border-[var(--ui-info-border)] bg-[var(--ui-info-surface)] text-[var(--ui-info-text)]",
  success: "border-[var(--ui-success-border)] bg-[var(--ui-success-surface)] text-[var(--ui-success-text)]",
  warning: "border-[var(--ui-warning-border)] bg-[var(--ui-warning-surface)] text-[var(--ui-warning-text)]",
  danger: "border-[var(--ui-danger-border)] bg-[var(--ui-danger-surface)] text-[var(--ui-danger-text)]"
};

export function StatusBadge({
  className,
  status = "neutral",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full border px-2.5 text-xs font-medium",
        statusClasses[status],
        className
      )}
      {...props}
    />
  );
}
