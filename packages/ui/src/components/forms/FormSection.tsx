import { useId, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type FormSectionProps = {
  title: string;
  children: ReactNode;
  description?: string;
  className?: string;
};

export function FormSection({
  children,
  className,
  description,
  title
}: FormSectionProps) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "grid gap-5 rounded-lg border border-slate-200 bg-white p-5",
        className
      )}
      role="group"
    >
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-slate-950" id={titleId}>
          {title}
        </h2>
        {description ? (
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}
