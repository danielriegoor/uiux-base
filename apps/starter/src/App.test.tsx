import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("starter app", () => {
  it("abre como experiencia de app com shell e navega para status", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Starter operacional" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Navegacao principal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Fila de trabalho");
    expect(screen.getByRole("status")).toHaveTextContent("Workspace");

    await userEvent.click(screen.getByRole("link", { name: "Status" }));

    expect(
      screen.getByRole("heading", { name: "Status da fundacao" })
    ).toBeInTheDocument();
  });

  it("exibe exemplos de guards e estados sem criar auth real", async () => {
    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: "Estados" }));

    expect(screen.getByRole("heading", { name: "Estados do app" })).toBeInTheDocument();
    expect(screen.getAllByRole("status").map((status) => status.textContent)).toEqual(
      expect.arrayContaining([expect.stringContaining("Verificando acesso")])
    );
    expect(screen.getAllByRole("alert").map((alert) => alert.textContent)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("Acesso negado"),
        expect.stringContaining("Workspace bloqueado")
      ])
    );
  });
});
