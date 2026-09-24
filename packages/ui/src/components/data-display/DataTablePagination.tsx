import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/cn";

export type DataTablePaginationProps<TData> = {
  className?: string;
  pageSizeOptions?: number[];
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  className,
  pageSizeOptions = [10, 25, 50],
  table
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = Math.max(table.getPageCount(), 1);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-[var(--ui-border-default)] p-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <p className="text-sm text-[var(--ui-text-muted)]">
        Pagina {pageIndex + 1} de {pageCount}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-[var(--ui-text-muted)]">
          Linhas por pagina
          <select
            aria-label="Linhas por pagina"
            className="h-9 rounded-md border border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] px-2 text-sm text-[var(--ui-text-strong)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)]"
            onChange={(event) => {
              table.setPageSize(Number(event.target.value));
              table.setPageIndex(0);
            }}
            value={pageSize}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            size="sm"
            variant="outline"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            Pagina anterior
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            size="sm"
            variant="outline"
          >
            Proxima pagina
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
