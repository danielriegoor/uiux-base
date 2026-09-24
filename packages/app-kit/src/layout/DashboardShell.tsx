import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState, type MouseEvent, type ReactNode } from "react";

export type DashboardShellProps = {
  children: ReactNode;
  sidebar: ReactNode;
  topbar?: ReactNode;
  statusBar?: ReactNode;
  className?: string;
  mainClassName?: string;
  mainId?: string;
  mobileBrand?: ReactNode;
  mobileNavigationTitle?: string;
  sidebarClassName?: string;
};

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardShell({
  children,
  className,
  mainClassName,
  mainId = "main-content",
  mobileBrand,
  mobileNavigationTitle = "Navegacao principal",
  sidebar,
  sidebarClassName,
  statusBar,
  topbar
}: DashboardShellProps) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  const closeOnNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      setMobileNavigationOpen(false);
    }
  };

  return (
    <div
      className={cx(
        "min-h-dvh w-full max-w-full overflow-x-hidden bg-[var(--ui-surface-canvas)] text-[var(--ui-text-strong)]",
        className
      )}
    >
      <a
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-md bg-[var(--ui-surface-panel)] px-3 py-2 text-sm font-semibold text-[var(--ui-text-strong)] shadow-lg transition-transform focus:translate-y-0 motion-reduce:transition-none"
        href={`#${mainId}`}
      >
        Pular para o conteudo
      </a>
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
        <aside
          className={cx(
            "hidden min-w-0 border-r border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] lg:block",
            sidebarClassName
          )}
        >
          {sidebar}
        </aside>
        <div className="flex min-w-0 flex-col">
          <DialogPrimitive.Root
            onOpenChange={setMobileNavigationOpen}
            open={mobileNavigationOpen}
          >
            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] px-4 lg:hidden">
              <div className="min-w-0 truncate text-sm font-semibold">
                {mobileBrand ?? mobileNavigationTitle}
              </div>
              <DialogPrimitive.Trigger asChild>
                <button
                  aria-label="Abrir navegacao principal"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] text-[var(--ui-text-body)] transition-colors hover:bg-[var(--ui-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] motion-reduce:transition-none"
                  type="button"
                >
                  <Menu aria-hidden="true" size={20} />
                </button>
              </DialogPrimitive.Trigger>
            </div>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-[var(--ui-overlay)] data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-safe:transition-opacity motion-safe:duration-200" />
              <DialogPrimitive.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 left-0 z-50 w-[min(20rem,calc(100vw-2rem))] overflow-y-auto border-r border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] shadow-2xl data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 motion-safe:transition-transform motion-safe:duration-200"
                onClickCapture={closeOnNavigation}
              >
                <DialogPrimitive.Title className="sr-only">
                  {mobileNavigationTitle}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close asChild>
                  <button
                    aria-label="Fechar navegacao principal"
                    className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--ui-text-muted)] transition-colors hover:bg-[var(--ui-surface-muted)] hover:text-[var(--ui-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] motion-reduce:transition-none"
                    type="button"
                  >
                    <X aria-hidden="true" size={20} />
                  </button>
                </DialogPrimitive.Close>
                {sidebar}
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
          {topbar}
          <main
            className={cx(
              "box-border min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8",
              mainClassName
            )}
            id={mainId}
          >
            {children}
          </main>
          {statusBar}
        </div>
      </div>
    </div>
  );
}
