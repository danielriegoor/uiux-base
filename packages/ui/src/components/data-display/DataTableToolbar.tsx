import type { ReactNode } from "react";
import { useId } from "react";
import { Input } from "../ui/input";
import { cn } from "../../lib/cn";

export type DataTableToolbarProps = {
  actions?: ReactNode;
  className?: string;
  filterLabel?: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  resultLabel?: ReactNode;
  searchPlaceholder?: string;
};

export function DataTableToolbar({
  actions,
  className,
  filterLabel = "Filtrar tabela",
  filterValue,
  onFilterChange,
  resultLabel,
  searchPlaceholder = "Filtrar registros"
}: DataTableToolbarProps) {
  const filterId = useId();

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <label className="sr-only" htmlFor={filterId}>
          {filterLabel}
        </label>
        <Input
          aria-label={filterLabel}
          className="max-w-sm"
          id={filterId}
          onChange={(event) => {
            onFilterChange(event.target.value);
          }}
          placeholder={searchPlaceholder}
          type="search"
          value={filterValue}
        />
      </div>
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        {resultLabel ? (
          <p className="text-sm text-slate-500" role="status">
            {resultLabel}
          </p>
        ) : null}
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
