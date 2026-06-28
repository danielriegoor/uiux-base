import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("demo app", () => {
  it("mostra a fundacao e navega para pacotes do workspace", async () => {
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
});
