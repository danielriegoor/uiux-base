import { useId, type ReactNode } from "react";
import type { NavigationItem } from "../navigation/types";

export type SidebarRenderLinkProps = {
  ariaCurrent?: "page";
  children: ReactNode;
  className: string;
};

export type SidebarGroup = {
  label: string;
  items: NavigationItem[];
};

export type SidebarProps = {
  brand: ReactNode;
  footer?: ReactNode;
  ariaLabel?: string;
  className?: string;
  renderLink?: (item: NavigationItem, props: SidebarRenderLinkProps) => ReactNode;
} & (
  | { items: NavigationItem[]; groups?: never }
  | { groups: SidebarGroup[]; items?: never }
);

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function renderItemContent(item: NavigationItem) {
  return (
    <>
      {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
      <span className="min-w-0 flex-1">
        <span className="block truncate">{item.label}</span>
        {item.description ? (
          <span className="block truncate text-xs font-normal text-[var(--ui-text-muted)]">
            {item.description}
          </span>
        ) : null}
      </span>
      {item.badge ? <span className="shrink-0">{item.badge}</span> : null}
    </>
  );
}

export function Sidebar({
  ariaLabel = "Navegacao principal",
  brand,
  className,
  footer,
  groups,
  items,
  renderLink
}: SidebarProps) {
  const headingId = useId();

  function renderItems(navItems: NavigationItem[]) {
    return navItems.map((item) => {
      const itemClassName = cx(
        "flex min-h-11 min-w-0 items-center gap-3 rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] motion-reduce:transition-none",
        item.isCurrent
          ? "border-[var(--ui-accent-border)] bg-[var(--ui-accent-surface)] text-[var(--ui-accent-text)]"
          : "border-transparent text-[var(--ui-text-body)] hover:bg-[var(--ui-surface-muted)] hover:text-[var(--ui-text-strong)]",
        item.disabled && "pointer-events-none opacity-50"
      );
      const children = renderItemContent(item);
      const ariaCurrent = item.isCurrent ? "page" : undefined;

      if (item.disabled) {
        return (
          <span aria-disabled="true" className={itemClassName} key={item.id}>
            {children}
          </span>
        );
      }

      return (
        <div key={item.id}>
          {renderLink ? (
            renderLink(item, { ariaCurrent, children, className: itemClassName })
          ) : (
            <a aria-current={ariaCurrent} className={itemClassName} href={item.href}>
              {children}
            </a>
          )}
        </div>
      );
    });
  }

  return (
    <nav
      aria-label={ariaLabel}
      className={cx("box-border flex h-full min-h-0 min-w-0 flex-col p-4", className)}
    >
      <div className="min-w-0 shrink-0 text-sm font-semibold text-[var(--ui-text-strong)]">{brand}</div>
      <div className="-mx-1 flex min-h-0 min-w-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-1 py-5">
        {items ? renderItems(items) : groups.map((group, index) => {
          if (group.items.length === 0) return null;
          const labelId = `${headingId}-${index}`;

          return (
            <section aria-labelledby={labelId} className="mb-4 space-y-1 last:mb-0" key={labelId}>
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--ui-text-muted)]" id={labelId}>
                {group.label}
              </p>
              {renderItems(group.items)}
            </section>
          );
        })}
      </div>
      {footer ? <div className="min-w-0 shrink-0 border-t border-[var(--ui-border-default)] pt-4">{footer}</div> : null}
    </nav>
  );
}
