import type { ReactNode } from "react";

export type DashboardContentProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardContent({
  actions,
  children,
  className,
  description,
  title
}: DashboardContentProps) {
  return (
    <section className={cx("min-w-0 space-y-5", className)}>
      {title || description || actions ? (
        <div className="flex min-w-0 flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-2">
            {title ? (
              <h1 className="text-2xl font-semibold leading-tight text-slate-950 sm:text-3xl">
                {title}
              </h1>
            ) : null}
            {description ? (
              <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </div>
      ) : null}
      <div className="min-w-0">{children}</div>
    </section>
  );
}
