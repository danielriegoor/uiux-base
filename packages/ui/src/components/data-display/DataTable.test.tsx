import type { ColumnDef } from "@tanstack/react-table";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, DataTable } from "../../index";

type RecordRow = {
  id: string;
  name: string;
  status: string;
  amount: number;
};

const rows: RecordRow[] = [
  { amount: 420, id: "rec-1", name: "Beta", status: "Ativo" },
  { amount: 180, id: "rec-2", name: "Alfa", status: "Pendente" },
  { amount: 760, id: "rec-3", name: "Delta", status: "Ativo" }
];

const denseRows: RecordRow[] = Array.from({ length: 12 }, (_, index) => ({
  amount: index * 10,
  id: `rec-${index + 1}`,
  name: `Registro ${index + 1}`,
  status: index % 2 === 0 ? "Ativo" : "Pendente"
}));

const columns: ColumnDef<RecordRow>[] = [
  {
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => `R$ ${row.original.amount}`
  }
];

describe("DataTable", () => {
  it("renderiza loading, erro e empty state com semantica acessivel", () => {
    const { rerender } = render(
      <DataTable columns={columns} data={[]} loading tableLabel="Registros" />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Carregando registros");

    rerender(
      <DataTable
        columns={columns}
        data={[]}
        error="Nao foi possivel carregar os registros."
        tableLabel="Registros"
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nao foi possivel carregar os registros."
    );

    rerender(<DataTable columns={columns} data={[]} tableLabel="Registros" />);

    expect(
      screen.getByRole("heading", { name: "Nenhum registro encontrado" })
    ).toBeInTheDocument();
  });

  it("filtra, ordena e executa acoes de linha por teclado", async () => {
    const user = userEvent.setup();
    let selected = "";

    render(
      <DataTable
        columns={columns}
        data={rows}
        renderRowActions={(row) => (
          <Button
            onClick={() => {
              selected = row.original.id;
            }}
            size="sm"
            variant="outline"
          >
            Abrir {row.original.name}
          </Button>
        )}
        tableLabel="Registros operacionais"
      />
    );

    expect(
      screen.getByRole("table", { name: "Registros operacionais" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Nome" }));

    expect(screen.getByRole("columnheader", { name: "Nome" })).toHaveAttribute(
      "aria-sort",
      "ascending"
    );

    const bodyRows = within(screen.getAllByRole("rowgroup")[1]).getAllByRole("row");
    expect(bodyRows[0]).toHaveTextContent("Alfa");

    await user.type(screen.getByRole("searchbox", { name: "Filtrar tabela" }), "Del");

    expect(screen.getByRole("cell", { name: "Delta" })).toBeInTheDocument();
    expect(screen.queryByRole("cell", { name: "Alfa" })).not.toBeInTheDocument();

    const rowAction = screen.getByRole("button", { name: "Abrir Delta" });
    rowAction.focus();
    await user.keyboard("[Enter]");

    expect(selected).toBe("rec-3");
  });

  it("pagina dados densos mantendo controles acessiveis", async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={columns}
        data={denseRows}
        initialPageSize={5}
        pageSizeOptions={[5, 10]}
        tableLabel="Registros densos"
      />
    );

    expect(screen.getByText("Pagina 1 de 3")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Registro 1" })).toBeInTheDocument();
    expect(
      screen.queryByRole("cell", { name: "Registro 6" })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Proxima pagina" }));

    expect(screen.getByText("Pagina 2 de 3")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Registro 6" })).toBeInTheDocument();

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Linhas por pagina" }),
      "10"
    );

    expect(screen.getByText("Pagina 1 de 2")).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "Registro 10" })).toBeInTheDocument();
  });
});
