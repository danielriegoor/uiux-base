import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type SortingState
} from "@tanstack/react-table";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { cn } from "../../lib/cn";
import { DataTableEmptyState } from "./DataTableEmptyState";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableToolbar } from "./DataTableToolbar";

export type DataTableProps<TData> = {
  className?: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyDescription?: string;
  emptyTitle?: string;
  error?: boolean | string;
  errorTitle?: string;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  initialPageSize?: number;
  loading?: boolean;
  pageSizeOptions?: number[];
  renderRowActions?: (row: Row<TData>) => ReactNode;
  rowActionsLabel?: string;
  searchPlaceholder?: string;
  tableDescription?: ReactNode;
  tableLabel: string;
  toolbarActions?: ReactNode;
};

function SortIndicator({ direction }: { direction: false | "asc" | "desc" }) {
  if (direction === "asc") {
    return <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />;
  }

  if (direction === "desc") {
    return <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />;
  }

  return <ArrowUpDown aria-hidden="true" className="h-3.5 w-3.5" />;
}

export function DataTable<TData>({
  className,
  columns,
  data,
  emptyDescription,
  emptyTitle,
  error,
  errorTitle = "Falha ao carregar registros",
  getRowId,
  initialPageSize = 10,
  loading = false,
  pageSizeOptions = [10, 25, 50],
  renderRowActions,
  rowActionsLabel = "Acoes",
  searchPlaceholder,
  tableDescription,
  tableLabel,
  toolbarActions
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize
  });

  const tableColumns = useMemo<ColumnDef<TData>[]>(
    () =>
      renderRowActions
        ? [
            ...columns,
            {
              cell: ({ row }) => (
                <div className="flex justify-end">{renderRowActions(row)}</div>
              ),
              enableSorting: false,
              header: rowActionsLabel,
              id: "__row_actions"
            }
          ]
        : columns,
    [columns, renderRowActions, rowActionsLabel]
  );

  const updateGlobalFilter = (value: string) => {
    setGlobalFilter(value);
    setPagination((current) => ({ ...current, pageIndex: 0 }));
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    setPagination((current) =>
      typeof updater === "function" ? updater(current) : updater
    );
  };

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table owns the table instance methods.
  const table = useReactTable({
    columns: tableColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: handlePaginationChange,
    onSortingChange: setSorting,
    state: {
      globalFilter,
      pagination,
      sorting
    }
  });

  const visibleRows = table.getRowModel().rows;
  const totalRows = table.getFilteredRowModel().rows.length;

  if (loading) {
    return (
      <LoadingState
        className={className}
        description="Aguarde enquanto os dados da tabela sao preparados."
        title="Carregando registros"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        className={className}
        description={
          typeof error === "string"
            ? error
            : "Nao foi possivel carregar os registros."
        }
        title={errorTitle}
      />
    );
  }

  return (
    <section
      aria-label={tableLabel}
      className={cn(
        "min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm",
        className
      )}
    >
      <DataTableToolbar
        actions={toolbarActions}
        filterValue={globalFilter}
        onFilterChange={updateGlobalFilter}
        resultLabel={`${totalRows} registro${totalRows === 1 ? "" : "s"}`}
        searchPlaceholder={searchPlaceholder}
      />
      {tableDescription ? (
        <div className="border-b border-slate-200 px-3 py-2 text-sm leading-6 text-slate-600">
          {tableDescription}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table
          aria-label={tableLabel}
          className="min-w-[720px] table-auto border-collapse text-left text-sm"
        >
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const ariaSort =
                    sorted === "asc"
                      ? "ascending"
                      : sorted === "desc"
                        ? "descending"
                        : undefined;

                  return (
                    <th
                      aria-sort={ariaSort}
                      className="border-b border-slate-200 px-3 py-3 font-semibold"
                      key={header.id}
                      scope="col"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          className="inline-flex items-center gap-2 rounded-sm text-left font-semibold text-slate-600 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <SortIndicator direction={sorted} />
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {visibleRows.length > 0 ? (
              visibleRows.map((row) => (
                <tr className="hover:bg-slate-50" key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="px-3 py-3 align-middle" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-3 py-6" colSpan={tableColumns.length}>
                  <DataTableEmptyState
                    description={emptyDescription}
                    title={emptyTitle}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DataTablePagination pageSizeOptions={pageSizeOptions} table={table} />
    </section>
  );
}
