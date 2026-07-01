import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../../index";

describe("primitives interativos", () => {
  it("permite usar Button como filho de triggers Radix sem warnings de ref", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    try {
      render(
        <TooltipProvider delayDuration={0}>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Abrir detalhes</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Detalhes do registro</DialogTitle>
              <DialogDescription>Revise as informacoes antes de continuar.</DialogDescription>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Acoes</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Arquivar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Ajuda">?</Button>
            </TooltipTrigger>
            <TooltipContent>Explique este campo</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

      expect(consoleError).not.toHaveBeenCalled();
    } finally {
      consoleError.mockRestore();
    }
  });

  it("alterna Checkbox por clique e teclado", async () => {
    const user = userEvent.setup();

    render(<Checkbox aria-label="Receber alertas" />);

    const checkbox = screen.getByRole("checkbox", { name: "Receber alertas" });
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    checkbox.focus();
    await user.keyboard("[Space]");
    expect(checkbox).not.toBeChecked();
  });

  it("abre Dialog pelo trigger e fecha com Escape mantendo labels", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button>Abrir detalhes</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Detalhes do registro</DialogTitle>
          <DialogDescription>Revise as informacoes antes de continuar.</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Abrir detalhes" }));

    const dialog = screen.getByRole("dialog", { name: "Detalhes do registro" });
    expect(dialog).toHaveTextContent("Revise as informacoes");

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("abre DropdownMenu e executa item selecionado", async () => {
    const user = userEvent.setup();
    let selected = "";

    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Acoes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => {
            selected = "archive";
          }}>
            Arquivar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await user.click(screen.getByRole("button", { name: "Acoes" }));
    await user.click(screen.getByRole("menuitem", { name: "Arquivar" }));

    expect(selected).toBe("archive");
  });

  it("troca Tabs por clique preservando estado selecionado", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="overview">
        <TabsList aria-label="Secoes do painel">
          <TabsTrigger value="overview">Visao geral</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Resumo operacional</TabsContent>
        <TabsContent value="activity">Eventos recentes</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Resumo operacional");

    await user.click(screen.getByRole("tab", { name: "Atividade" }));

    expect(screen.getByRole("tab", { name: "Atividade" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Eventos recentes");
  });

  it("mostra Tooltip com conteudo acessivel no hover", async () => {
    const user = userEvent.setup();

    render(
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Ajuda">?</Button>
          </TooltipTrigger>
          <TooltipContent>Explique este campo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    await user.hover(screen.getByRole("button", { name: "Ajuda" }));

    expect(await screen.findByRole("tooltip")).toHaveTextContent(
      "Explique este campo"
    );
  });
});
