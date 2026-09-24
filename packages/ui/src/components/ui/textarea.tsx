import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md border border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] px-3 py-2 text-sm text-[var(--ui-text-strong)] shadow-sm transition-colors placeholder:text-[var(--ui-text-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";
