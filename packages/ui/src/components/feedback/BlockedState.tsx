import { LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type BlockedStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function BlockedState({
  action,
  className,
  description = "Esta area precisa de permissao adicional para ser acessada.",
  title
}: BlockedStateProps) {
  return (
    <section
      className={cn(
        "flex flex-col items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-950",
        className
      )}
    >
      <div className="flex gap-3">
        <LockKeyhole aria-hidden="true" className="mt-0.5 h-5 w-5" />
        <div className="space-y-1">
          <h2 className="text-sm font-semibold">{title}</h2>
          {description ? <p className="text-sm leading-6">{description}</p> : null}
        </div>
      </div>
      {action ? <div className="pl-8">{action}</div> : null}
    </section>
  );
}
