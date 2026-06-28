import type { ReactNode } from "react";

export type TopbarProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Topbar({
  actions,
  className,
  description,
  eyebrow,
  title
}: TopbarProps) {
  return (
    <header
      className={cx(
        "box-border flex min-w-0 flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8",
        className
      )}
    >
      <div className="min-w-0 space-y-1">
        {eyebrow ? (
          <div className="text-xs font-semibold uppercase text-slate-500">
            {eyebrow}
          </div>
        ) : null}
        <p className="text-lg font-semibold leading-7 text-slate-950">{title}</p>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </header>
  );
}
