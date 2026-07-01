import type { ReactNode } from "react";
import { EmptyState } from "../feedback/EmptyState";

export type DataTableEmptyStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function DataTableEmptyState({
  action,
  className,
  description = "Ajuste os filtros ou adicione novos itens para preencher esta tabela.",
  title = "Nenhum registro encontrado"
}: DataTableEmptyStateProps) {
  return (
    <EmptyState
      action={action}
      className={className}
      description={description}
      title={title}
    />
  );
}
