import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppStateBoundary, WorkspaceStateNotice } from "../index";

describe("WorkspaceStateNotice", () => {
  it("nao renderiza aviso quando o workspace esta pronto", () => {
    const { container } = render(<WorkspaceStateNotice state="ready" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza estado bloqueado com alerta claro", () => {
    render(<WorkspaceStateNotice state="blocked" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Workspace bloqueado");
  });
});

describe("AppStateBoundary", () => {
  it("renderiza filhos apenas quando acesso e workspace estao prontos", () => {
    render(
      <AppStateBoundary accessStatus="allowed" workspaceState="ready">
        <p>Aplicacao pronta</p>
      </AppStateBoundary>
    );

    expect(screen.getByText("Aplicacao pronta")).toBeInTheDocument();
  });

  it("prioriza guard de acesso antes do estado de workspace", () => {
    render(
      <AppStateBoundary accessStatus="denied" workspaceState="blocked">
        <p>Aplicacao pronta</p>
      </AppStateBoundary>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Acesso negado");
    expect(screen.queryByText("Aplicacao pronta")).not.toBeInTheDocument();
  });
});
