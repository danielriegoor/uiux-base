import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type FieldGroupProps = {
  label: string;
  children: ReactNode;
  htmlFor?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FieldGroup({
  children,
  className,
  error,
  hint,
  htmlFor,
  label,
  required = false
}: FieldGroupProps) {
  const generatedHintId = useId();
  const hintId = hint ? generatedHintId : undefined;

  return (
    <div className={cn("grid gap-2", className)}>
      <label className="text-sm font-medium text-[var(--ui-text-body)]" htmlFor={htmlFor}>
        {label}
        {required ? <span className="text-[var(--ui-danger-solid)]"> *</span> : null}
      </label>
      {children}
      {hint ? (
        <p className="text-xs leading-5 text-[var(--ui-text-muted)]" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs leading-5 text-[var(--ui-danger-solid)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
