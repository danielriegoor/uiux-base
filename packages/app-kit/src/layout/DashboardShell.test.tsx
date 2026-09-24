import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  DashboardContent,
  DashboardShell,
  Sidebar,
  StatusBar,
  Topbar,
  createRouteNav
} from "../index";

describe("DashboardShell", () => {
  it("renderiza shell responsivo com sidebar, topbar, conteudo e status bar", () => {
    const navItems = createRouteNav([
      { href: "/", isCurrent: true, label: "Inicio" },
      { href: "/status", label: "Status" }
    ]);

    render(
      <DashboardShell
        sidebar={<Sidebar brand="uiux-base" items={navItems} />}
        statusBar={
          <StatusBar
            items={[
              { label: "Workspace", tone: "success", value: "Ativo" },
              { label: "Ambiente", value: "Local" }
            ]}
          />
        }
        topbar={
          <Topbar
            actions={<button type="button">Atualizar</button>}
            description="Operacao diaria do starter."
            title="Painel"
          />
        }
      >
        <DashboardContent
          actions={<button type="button">Novo registro</button>}
          description="Fila operacional sem landing page."
          title="Fila de trabalho"
        >
          <p>Itens recentes</p>
        </DashboardContent>
      </DashboardShell>
    );

    expect(
      screen.getByRole("navigation", { name: "Navegacao principal" })
    ).toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveTextContent("Painel");
    expect(screen.getByRole("main")).toHaveTextContent("Fila de trabalho");
    expect(screen.getByRole("status")).toHaveTextContent("Workspace");
    expect(screen.getByRole("button", { name: "Atualizar" })).toBeInTheDocument();

    const sidebar = screen.getByRole("navigation", {
      name: "Navegacao principal"
    });
    expect(within(sidebar).getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("abre e fecha a navegacao mobile com foco e nomes acessiveis", async () => {
    const user = userEvent.setup();

    render(
      <DashboardShell
        mobileBrand="uiux-base"
        sidebar={
          <Sidebar
            brand="uiux-base"
            items={createRouteNav([{ href: "/", label: "Inicio" }], "/")}
          />
        }
      >
        <p>Conteudo principal</p>
      </DashboardShell>
    );

    const trigger = screen.getByRole("button", {
      name: "Abrir navegacao principal"
    });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Navegacao principal" });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "aria-current",
      "page"
    );

    expect(
      within(dialog).getByRole("button", { name: "Fechar navegacao principal" })
    ).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: "Navegacao principal" })
    ).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
