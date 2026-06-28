import type { ReactNode } from "react";

export type DashboardShellProps = {
  children: ReactNode;
  sidebar: ReactNode;
  topbar?: ReactNode;
  statusBar?: ReactNode;
  className?: string;
  mainClassName?: string;
  sidebarClassName?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardShell({
  children,
  className,
  mainClassName,
  sidebar,
  sidebarClassName,
  statusBar,
  topbar
}: DashboardShellProps) {
  return (
    <div
      className={cx(
        "min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 text-slate-950",
        className
      )}
    >
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <div
          className={cx(
            "min-w-0 border-b border-slate-200 bg-white lg:border-b-0 lg:border-r",
            sidebarClassName
          )}
        >
          {sidebar}
        </div>
        <div className="flex min-w-0 flex-col">
          {topbar}
          <main
            className={cx(
              "box-border min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8",
              mainClassName
            )}
          >
            {children}
          </main>
          {statusBar}
        </div>
      </div>
    </div>
  );
}
