import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GuardNotice, RequireAccess } from "../index";

describe("RequireAccess", () => {
  it("renderiza os filhos quando o acesso esta permitido", () => {
    render(
      <RequireAccess status="allowed">
        <p>Conteudo operacional</p>
      </RequireAccess>
    );

    expect(screen.getByText("Conteudo operacional")).toBeInTheDocument();
  });

  it("mostra estado de loading sem revelar o conteudo protegido", () => {
    render(
      <RequireAccess status="loading">
        <p>Conteudo protegido</p>
      </RequireAccess>
    );

    expect(screen.getByRole("status")).toHaveTextContent("Verificando acesso");
    expect(screen.queryByText("Conteudo protegido")).not.toBeInTheDocument();
  });

  it("mostra acesso negado com semantica de alerta", () => {
    render(
      <RequireAccess status="denied">
        <p>Conteudo protegido</p>
      </RequireAccess>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Acesso negado");
    expect(screen.queryByText("Conteudo protegido")).not.toBeInTheDocument();
  });

  it("renderiza aviso bloqueado com acao opcional", () => {
    render(
      <GuardNotice
        action={<button type="button">Solicitar acesso</button>}
        description="Complete a configuracao do workspace."
        title="Workspace bloqueado"
        variant="blocked"
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Workspace bloqueado");
    expect(
      screen.getByRole("button", { name: "Solicitar acesso" })
    ).toBeInTheDocument();
  });
});
