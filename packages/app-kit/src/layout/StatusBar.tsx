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
  danger: "bg-[var(--ui-danger-surface)]0",
  neutral: "bg-[var(--ui-text-subtle)]",
  success: "bg-[var(--ui-success-surface)]0",
  warning: "bg-[var(--ui-warning-surface)]0"
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
        "box-border flex min-w-0 flex-wrap gap-x-5 gap-y-2 border-t border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] px-4 py-3 text-xs text-[var(--ui-text-muted)] sm:px-6 lg:px-8",
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
          <span className="font-medium text-[var(--ui-text-muted)]">{item.label}</span>
          <span className="min-w-0 font-semibold text-[var(--ui-text-strong)]">{item.value}</span>
        </span>
      ))}
    </footer>
  );
}
