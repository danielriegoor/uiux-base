import type { ReactNode } from "react";

export type StatusBarTone = "neutral" | "success" | "warning" | "danger";

export type StatusBarItem = {
  label: string;
  value: ReactNode;
  tone?: StatusBarTone;
};

export type StatusBarProps = {
  items: StatusBarItem[];
  ariaLabel?: string;
  className?: string;
};

const toneClassNames: Record<StatusBarTone, string> = {
  danger: "bg-red-500",
  neutral: "bg-slate-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500"
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function StatusBar({
  ariaLabel = "Status do app",
  className,
  items
}: StatusBarProps) {
  return (
    <footer
      aria-label={ariaLabel}
      aria-live="polite"
      className={cx(
        "box-border flex min-w-0 flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 sm:px-6 lg:px-8",
        className
      )}
      role="status"
    >
      {items.map((item) => (
        <span className="inline-flex min-w-0 items-center gap-2" key={item.label}>
          <span
            aria-hidden="true"
            className={cx(
              "h-2 w-2 shrink-0 rounded-full",
              toneClassNames[item.tone ?? "neutral"]
            )}
          />
          <span className="font-medium text-slate-500">{item.label}</span>
          <span className="min-w-0 font-semibold text-slate-900">{item.value}</span>
        </span>
      ))}
    </footer>
  );
}
