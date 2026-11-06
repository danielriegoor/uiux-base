import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

export type DashboardShellProps = {
  children: ReactNode;
  sidebar: ReactNode;
  topbar?: ReactNode;
  statusBar?: ReactNode;
  className?: string;
  layout?: "page" | "workspace";
  mainClassName?: string;
  mainId?: string;
  mobileBrand?: ReactNode;
  mobileNavigationDescription?: string;
  mobileNavigationTitle?: string;
  sidebarClassName?: string;
};

const desktopMediaQuery = "(min-width: 64rem)";

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function DashboardShell({
  children,
  className,
  layout = "page",
  mainClassName,
  mainId = "main-content",
  mobileBrand,
  mobileNavigationDescription,
  mobileNavigationTitle = "Navegacao principal",
  sidebar,
  sidebarClassName,
  statusBar,
  topbar
}: DashboardShellProps) {
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const isWorkspace = layout === "workspace";

  useEffect(() => {
    if (!mobileNavigationOpen || !window.matchMedia) return;

    const desktop = window.matchMedia(desktopMediaQuery);
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileNavigationOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [mobileNavigationOpen]);

  const closeOnNavigation = (event: MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest<HTMLAnchorElement>("a[href]");
    if (!link || link.hasAttribute("download") || (link.target && link.target.toLowerCase() !== "_self")) return;

    // Routers can prevent the browser navigation while handling the link themselves.
    setMobileNavigationOpen(false);
  };

  return (
    <div
      className={cx(
        "w-full max-w-full bg-[var(--ui-surface-canvas)] text-[var(--ui-text-strong)]",
        isWorkspace ? "h-dvh overflow-hidden" : "min-h-dvh overflow-x-clip",
        className
      )}
    >
      <a
        className="fixed left-3 top-3 z-[60] -translate-y-20 rounded-md bg-[var(--ui-surface-panel)] px-3 py-2 text-sm font-semibold text-[var(--ui-text-strong)] shadow-lg transition-transform focus:translate-y-0 motion-reduce:transition-none"
        href={`#${mainId}`}
      >
        Pular para o conteudo
      </a>
      <div className={cx(
        "mx-auto grid w-full grid-cols-1 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]",
        isWorkspace ? "h-full grid-rows-[minmax(0,1fr)]" : "min-h-dvh max-w-7xl"
      )}>
        <aside
          className={cx(
            "hidden h-dvh min-w-0 self-start overflow-y-auto border-r border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] lg:sticky lg:top-0 lg:block",
            sidebarClassName
          )}
        >
          {sidebar}
        </aside>
        <div className="flex min-h-0 min-w-0 flex-col">
          <DialogPrimitive.Root
            onOpenChange={setMobileNavigationOpen}
            open={mobileNavigationOpen}
          >
            <div className="flex min-h-16 shrink-0 items-center justify-between gap-4 border-b border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] px-4 lg:hidden">
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
                {...(!mobileNavigationDescription && { "aria-describedby": undefined })}
                className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,calc(100vw-2rem))] flex-col border-r border-[var(--ui-border-default)] bg-[var(--ui-surface-panel)] shadow-2xl data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 motion-safe:transition-transform motion-safe:duration-200"
                onClick={closeOnNavigation}
                onCloseAutoFocus={(event) => {
                  if (!window.matchMedia?.(desktopMediaQuery).matches) return;
                  event.preventDefault();
                  mainRef.current?.focus({ preventScroll: true });
                }}
              >
                <DialogPrimitive.Title className="sr-only">
                  {mobileNavigationTitle}
                </DialogPrimitive.Title>
                {mobileNavigationDescription ? (
                  <DialogPrimitive.Description className="sr-only">
                    {mobileNavigationDescription}
                  </DialogPrimitive.Description>
                ) : null}
                <div className="flex shrink-0 justify-end border-b border-[var(--ui-border-default)] p-2">
                  <DialogPrimitive.Close asChild>
                    <button
                      aria-label="Fechar navegacao principal"
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-[var(--ui-text-muted)] transition-colors hover:bg-[var(--ui-surface-muted)] hover:text-[var(--ui-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] motion-reduce:transition-none"
                      type="button"
                    >
                      <X aria-hidden="true" size={20} />
                    </button>
                  </DialogPrimitive.Close>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">{sidebar}</div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
          {topbar}
          <main
            className={cx(
              "box-border min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8",
              isWorkspace && "min-h-0 overflow-y-auto overscroll-contain",
              mainClassName
            )}
            id={mainId}
            ref={mainRef}
            tabIndex={-1}
          >
            {children}
          </main>
          {statusBar}
        </div>
      </div>
    </div>
  );
}
