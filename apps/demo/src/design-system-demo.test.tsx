import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("demo de design system", () => {
  it("apresenta exemplos do pacote UI e interage com os primitives", async () => {
    const user = userEvent.setup();

    window.history.pushState({}, "", "/");

    render(<App />);

    await user.click(screen.getByRole("link", { name: "Design system" }));

    expect(
      screen.getByRole("heading", { name: "Design system e UI package" })
    ).toBeInTheDocument();
    expect(screen.getByText("Receita mensal")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir dialog" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir dialog" }));
    expect(
      screen.getByRole("dialog", { name: "Confirmar exemplo" })
    ).toBeInTheDocument();
  });
});
