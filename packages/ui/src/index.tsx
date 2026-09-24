export * from "uiux-base-app-kit";

export { BlockedState, type BlockedStateProps } from "./components/feedback/BlockedState";
export { EmptyState, type EmptyStateProps } from "./components/feedback/EmptyState";
export { ErrorState, type ErrorStateProps } from "./components/feedback/ErrorState";
export { LoadingState, type LoadingStateProps } from "./components/feedback/LoadingState";
export {
  ToastProvider,
  toast,
  type ToastProviderProps
} from "./components/feedback/ToastProvider";
export { FieldGroup, type FieldGroupProps } from "./components/forms/FieldGroup";
export { FormSection, type FormSectionProps } from "./components/forms/FormSection";
export { SubmitBar, type SubmitBarProps } from "./components/forms/SubmitBar";
export {
  DataTable,
  type DataTableProps
} from "./components/data-display/DataTable";
export {
  DataTableEmptyState,
  type DataTableEmptyStateProps
} from "./components/data-display/DataTableEmptyState";
export {
  DataTablePagination,
  type DataTablePaginationProps
} from "./components/data-display/DataTablePagination";
export {
  DataTableToolbar,
  type DataTableToolbarProps
} from "./components/data-display/DataTableToolbar";
export { KpiCard, type KpiCardProps } from "./components/data-display/KpiCard";
export {
  StatusBadge,
  type StatusBadgeProps,
  type StatusBadgeStatus
} from "./components/data-display/StatusBadge";
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button";
export { Checkbox } from "./components/ui/checkbox";
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger
} from "./components/ui/dialog";
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "./components/ui/dropdown-menu";
export { Input, type InputProps } from "./components/ui/input";
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "./components/ui/select";
export { Skeleton, type SkeletonProps } from "./components/ui/skeleton";
export {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "./components/ui/tabs";
export { Textarea, type TextareaProps } from "./components/ui/textarea";
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./components/ui/tooltip";
export { cn } from "./lib/cn";
export { colorTokens, type ColorTokens } from "./tokens/colors";
export { spacingTokens, type SpacingTokens } from "./tokens/spacing";

export function UiFoundationMark() {
  return (
    <div
      aria-label="Estado do pacote UI"
      className="inline-flex items-center gap-2 rounded-md border border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] px-3 py-2 text-sm text-[var(--ui-text-body)]"
    >
      <strong className="font-semibold text-[var(--ui-text-strong)]">uiux-base pronto</strong>
      <span className="text-[var(--ui-text-muted)]">pacote npm neutro</span>
    </div>
  );
}
