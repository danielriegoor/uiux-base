import type { ReactNode } from "react";
import type { NavigationItem } from "../navigation/types";

export type SidebarRenderLinkProps = {
  ariaCurrent?: "page";
  children: ReactNode;
  className: string;
};

export type SidebarProps = {
  brand: ReactNode;
  items: NavigationItem[];
  footer?: ReactNode;
  ariaLabel?: string;
  className?: string;
  renderLink?: (item: NavigationItem, props: SidebarRenderLinkProps) => ReactNode;
};

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
  items,
  renderLink
}: SidebarProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={cx("box-border flex h-full min-w-0 flex-col gap-5 p-4", className)}
    >
      <div className="min-w-0 text-sm font-semibold text-[var(--ui-text-strong)]">{brand}</div>
      <div className="flex min-w-0 flex-col gap-1">
        {items.map((item) => {
          const itemClassName = cx(
            "flex min-h-11 min-w-0 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)]",
            item.isCurrent
              ? "bg-[var(--ui-info-surface)] text-[var(--ui-accent-text)]"
              : "text-[var(--ui-text-body)] hover:bg-[var(--ui-surface-muted)] hover:text-[var(--ui-text-strong)]",
            item.disabled && "pointer-events-none opacity-50"
          );
          const children = renderItemContent(item);
          const ariaCurrent = item.isCurrent ? "page" : undefined;

          if (item.disabled) {
            return (
              <span
                aria-disabled="true"
                className={itemClassName}
                key={item.id}
              >
                {children}
              </span>
            );
          }

          return (
            <div key={item.id}>
              {renderLink ? (
                renderLink(item, {
                  ariaCurrent,
                  children,
                  className: itemClassName
                })
              ) : (
                <a
                  aria-current={ariaCurrent}
                  className={itemClassName}
                  href={item.href}
                >
                  {children}
                </a>
              )}
            </div>
          );
        })}
      </div>
      {footer ? <div className="mt-auto min-w-0 pt-4">{footer}</div> : null}
    </nav>
  );
}
