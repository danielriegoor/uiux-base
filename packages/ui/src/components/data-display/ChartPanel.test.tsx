import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, ChartPanel, ChartTooltip, chartTokens } from "../../index";

const chartData = [
  { label: "Jan", receita: 1200, custos: 820 },
  { label: "Fev", receita: 1480, custos: 910 }
];

describe("ChartPanel", () => {
  it("renderiza loading, erro e empty state com semantica acessivel", () => {
    const { rerender } = render(
      <ChartPanel
        data={[]}
        loading
        series={[{ key: "receita", label: "Receita" }]}
        title="Indicadores"
        xAxisKey="label"
      />
    );

    expect(screen.getByRole("status")).toHaveTextContent("Carregando grafico");

    rerender(
      <ChartPanel
        data={[]}
        error="Nao foi possivel carregar o grafico."
        series={[{ key: "receita", label: "Receita" }]}
        title="Indicadores"
        xAxisKey="label"
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Nao foi possivel carregar o grafico."
    );

    rerender(
      <ChartPanel
        data={[]}
        series={[{ key: "receita", label: "Receita" }]}
        title="Indicadores"
        xAxisKey="label"
      />
    );

    expect(
      screen.getByRole("heading", { name: "Nenhum dado para exibir" })
    ).toBeInTheDocument();
  });

  it("renderiza grafico com titulo, acoes, legenda textual e resumo acessivel", () => {
    render(
      <ChartPanel
        actions={<Button variant="outline">Atualizar</Button>}
        ariaLabel="Grafico de indicadores mensais"
        data={chartData}
        description="Valores ficticios para validar o painel."
        series={[
          { key: "receita", label: "Receita", unit: "R$" },
          { key: "custos", label: "Custos", unit: "R$" }
        ]}
        title="Indicadores mensais"
        type="bar"
        xAxisKey="label"
      />
    );

    expect(
      screen.getByRole("heading", { name: "Indicadores mensais" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Atualizar" })).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Grafico de indicadores mensais" })
    ).toBeInTheDocument();

    const legend = screen.getByRole("list", { name: "Series do grafico" });
    expect(within(legend).getByText("Receita")).toBeInTheDocument();
    expect(within(legend).getByText("Custos")).toBeInTheDocument();

    expect(screen.getByText("Jan: Receita 1200, Custos 820")).toBeInTheDocument();
    expect(chartTokens.series[0]).toMatch(/^hsl/);
  });
});

describe("ChartTooltip", () => {
  it("formata label, series e valores ativos", () => {
    render(
      <ChartTooltip
        active
        formatter={(value, unit) => `${unit ?? ""} ${value}`.trim()}
        label="Jan"
        payload={[
          {
            color: chartTokens.series[0],
            dataKey: "receita",
            name: "Receita",
            payload: chartData[0],
            value: 1200
          },
          {
            color: chartTokens.series[1],
            dataKey: "custos",
            name: "Custos",
            payload: chartData[0],
            unit: "R$",
            value: 820
          }
        ]}
      />
    );

    expect(screen.getByText("Jan")).toBeInTheDocument();
    expect(screen.getByText("Receita")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
    expect(screen.getByText("R$ 820")).toBeInTheDocument();
  });
});
