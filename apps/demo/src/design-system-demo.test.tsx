import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("demo de design system", () => {
  it("apresenta exemplos do pacote UI e interage com os primitives", async () => {
    const user = userEvent.setup();

    window.history.pushState({}, "", "/components");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Components" })
    ).toBeInTheDocument();
    expect(screen.getByText("Usuarios ativos")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir dialog" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir dialog" }));
    expect(
      screen.getByRole("dialog", { name: "Confirmar exemplo" })
    ).toBeInTheDocument();
  });
});
