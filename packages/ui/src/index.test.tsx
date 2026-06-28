import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UiFoundationMark } from "./index";

describe("UiFoundationMark", () => {
  it("renderiza o marcador neutro de fundacao do pacote UI", () => {
    render(<UiFoundationMark />);

    expect(screen.getByText("Pacote UI pronto")).toBeInTheDocument();
    expect(screen.getByText("base neutra")).toBeInTheDocument();
  });
});
