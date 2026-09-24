import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("starter app", () => {
  it("abre como experiencia de app com shell e rotas de dashboard", async () => {
    window.history.pushState({}, "", "/dashboard");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Navegacao principal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Indicadores");
    expect(screen.getByRole("status", { name: "Status do app" })).toHaveTextContent(
      "Workspace"
    );

    await userEvent.click(screen.getByRole("link", { name: "Overview" }));

    expect(
      screen.getByRole("heading", { name: "Overview" })
    ).toBeInTheDocument();
  });

  it("navega por records e settings com dados genericos", async () => {
    window.history.pushState({}, "", "/dashboard");

    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: "Records" }));
    expect(screen.getByRole("heading", { name: "Records" })).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: "Registros genericos" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Settings" }));
    expect(screen.getByRole("heading", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByLabelText("Nome do workspace")).toHaveValue("Acme Workspace");
  });

  it("exibe estados loading, empty, error e blocked sem auth real", () => {
    window.history.pushState({}, "", "/dashboard");

    render(<App />);

    expect(screen.getByText("Carregando registros")).toBeInTheDocument();
    expect(screen.getByText("Nenhum evento encontrado")).toBeInTheDocument();
    expect(screen.getByText("Falha ao buscar metricas")).toBeInTheDocument();
    expect(screen.getByText("Workspace bloqueado")).toBeInTheDocument();
  });

  it("redireciona a raiz para dashboard sem landing page", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/dashboard");
  });
});
