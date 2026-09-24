import axe from "axe-core";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardShell, Sidebar, StatusBar, Topbar, createRouteNav } from "./index";

describe("acessibilidade estrutural de uiux-base-app-kit", () => {
  it("nao encontra violacoes automaticas no shell representativo", async () => {
    const { container } = render(
      <DashboardShell
        sidebar={
          <Sidebar
            brand="Produto"
            items={createRouteNav([{ href: "/", label: "Inicio" }], "/")}
          />
        }
        statusBar={
          <StatusBar items={[{ label: "Sistema", tone: "success", value: "Ativo" }]} />
        }
        topbar={<Topbar description="Visao operacional" title="Painel" />}
      >
        <h1>Conteudo principal</h1>
      </DashboardShell>
    );

    const result = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } }
    });

    expect(result.violations).toEqual([]);
  });
});
