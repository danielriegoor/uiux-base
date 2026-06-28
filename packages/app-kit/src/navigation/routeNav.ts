import type { NavigationItem, NavigationItemInput } from "./types";

function normalizeHref(href: string) {
  if (href === "/") {
    return href;
  }

  return href.replace(/\/+$/, "");
}

export function createRouteNav(
  items: NavigationItemInput[],
  currentHref?: string
): NavigationItem[] {
  const normalizedCurrentHref = currentHref
    ? normalizeHref(currentHref)
    : undefined;

  return items.map((item) => ({
    ...item,
    id: `${item.href}:${item.label}`,
    isCurrent:
      item.isCurrent ??
      (normalizedCurrentHref
        ? normalizeHref(item.href) === normalizedCurrentHref
        : false)
  }));
}
