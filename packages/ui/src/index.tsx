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
  ChartPanel,
  type ChartPanelProps,
  type ChartPanelType,
  type ChartSeriesConfig
} from "./components/data-display/ChartPanel";
export {
  ChartTooltip,
  type ChartTooltipDataKey,
  type ChartTooltipPayloadItem,
  type ChartTooltipProps,
  type ChartTooltipValue,
  type ChartValueFormatter
} from "./components/data-display/ChartTooltip";
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
export { chartTokens, type ChartTokens } from "./tokens/chartTokens";
export { colorTokens, type ColorTokens } from "./tokens/colors";
export { spacingTokens, type SpacingTokens } from "./tokens/spacing";

export function UiFoundationMark() {
  return (
    <div
      aria-label="Estado do pacote UI"
      className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
    >
      <strong className="font-semibold text-slate-950">Pacote UI pronto</strong>
      <span className="text-slate-500">base neutra</span>
    </div>
  );
}
