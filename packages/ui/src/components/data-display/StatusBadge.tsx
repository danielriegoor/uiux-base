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
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-800",
  danger: "border-red-200 bg-red-50 text-red-700"
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
