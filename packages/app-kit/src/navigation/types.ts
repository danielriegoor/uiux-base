import type { ReactNode } from "react";

export type NavigationItemInput = {
  label: string;
  href: string;
  description?: string;
  badge?: ReactNode;
  icon?: ReactNode;
  isCurrent?: boolean;
  disabled?: boolean;
};

export type NavigationItem = NavigationItemInput & {
  id: string;
  isCurrent: boolean;
};
