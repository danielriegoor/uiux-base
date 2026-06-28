import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("starter app", () => {
  it("abre como experiencia de app e navega para status", async () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: "Starter operacional" })
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("link", { name: "Status" }));

    expect(
      screen.getByRole("heading", { name: "Status da fundacao" })
    ).toBeInTheDocument();
  });
});
