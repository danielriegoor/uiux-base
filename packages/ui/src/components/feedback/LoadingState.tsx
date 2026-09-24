import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";

export type LoadingStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function LoadingState({
  className,
  description = "Aguarde enquanto preparamos as informacoes.",
  title
}: LoadingStateProps) {
  return (
    <section
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] p-4 text-[var(--ui-text-body)]",
        className
      )}
      role="status"
    >
      <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-[var(--ui-text-strong)]">{title}</h2>
        {description ? (
          <p className="text-sm leading-6 text-[var(--ui-text-muted)]">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
