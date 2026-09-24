import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("demo app", () => {
  it("abre a vitrine em componentes e navega para forms e feedback", async () => {
    window.history.pushState({}, "", "/components");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Components" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Forms" }));
    expect(screen.getByRole("heading", { name: "Forms" })).toBeInTheDocument();
    expect(screen.getByLabelText("Titulo do registro")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Feedback" }));
    expect(screen.getByRole("heading", { name: "Feedback" })).toBeInTheDocument();
    expect(screen.getByText("Nenhum resultado generico")).toBeInTheDocument();
  });

  it("navega para data-table, dashboard-shell e states", async () => {
    window.history.pushState({}, "", "/components");

    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: "Data table" }));
    expect(screen.getByRole("heading", { name: "Data table" })).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: "Projetos genericos" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Dashboard shell" }));
    expect(
      screen.getByRole("heading", { name: "Dashboard shell" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "uiux-base-app-kit" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "States" }));
    expect(screen.getByRole("heading", { name: "States" })).toBeInTheDocument();
    expect(screen.getByText("Acesso visual bloqueado")).toBeInTheDocument();
  });

  it("redireciona a raiz para components sem landing page", () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(screen.getByRole("heading", { name: "Components" })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/components");
  });
});
