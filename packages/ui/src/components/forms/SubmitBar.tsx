import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../ui/button";

export type SubmitBarProps = {
  submitLabel?: string;
  cancelLabel?: string;
  extraActions?: ReactNode;
  isSubmitting?: boolean;
  className?: string;
};

export function SubmitBar({
  cancelLabel,
  className,
  extraActions,
  isSubmitting = false,
  submitLabel = "Salvar"
}: SubmitBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-[var(--ui-border-default)] pt-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div>{extraActions}</div>
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        {cancelLabel ? (
          <Button type="button" variant="outline">
            {cancelLabel}
          </Button>
        ) : null}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </div>
  );
}
