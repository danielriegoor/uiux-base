import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("demo app", () => {
  it("mostra a fundacao e navega para pacotes do workspace", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Demo da fundacao" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Pacotes" }));

    expect(
      screen.getByRole("heading", { name: "Pacotes do workspace" })
    ).toBeInTheDocument();
    expect(screen.getByText("@uiux-base/ui")).toBeInTheDocument();
    expect(screen.getByText("@uiux-base/app-kit")).toBeInTheDocument();
  });

  it("navega para exemplos de data display com tabela e grafico", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    await userEvent.click(screen.getByRole("link", { name: "Data display" }));

    expect(
      screen.getByRole("heading", { name: "Data display" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("table", { name: "Registros de exemplo" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Grafico de volume por periodo" })
    ).toBeInTheDocument();
  });
});
