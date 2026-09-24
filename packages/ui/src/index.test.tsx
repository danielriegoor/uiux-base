import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  BlockedState,
  Button,
  EmptyState,
  ErrorState,
  FieldGroup,
  FormSection,
  Input,
  KpiCard,
  LoadingState,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  StatusBadge,
  SubmitBar,
  Textarea,
  ToastProvider,
  cn,
  colorTokens,
  spacingTokens
} from "./index";

describe("exports publicos do pacote UI", () => {
  it("expoe primitives, tokens e utilitarios reutilizaveis", () => {
    expect(cn("px-2", false, "py-1")).toBe("px-2 py-1");
    expect(colorTokens.surface.canvas).toBeDefined();
    expect(spacingTokens.component.md).toBeDefined();
  });

  it("renderiza primitives basicos com nomes acessiveis", () => {
    render(
      <div>
        <Button>Salvar</Button>
        <Input aria-label="Nome" />
        <Textarea aria-label="Descricao" />
        <Select>
          <SelectTrigger aria-label="Status">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Ativo</SelectItem>
          </SelectContent>
        </Select>
        <Skeleton aria-label="Carregando lista" />
      </div>
    );

    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nome" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Descricao" })
    ).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByLabelText("Carregando lista")).toBeInTheDocument();
  });

  it("renderiza estados compartilhados com semantica correta", () => {
    render(
      <div>
        <LoadingState title="Carregando registros" />
        <ErrorState title="Falha ao carregar" action={<Button>Tentar de novo</Button>} />
        <EmptyState title="Nenhum registro" action={<Button>Novo registro</Button>} />
        <BlockedState title="Acesso bloqueado" action={<Button>Solicitar acesso</Button>} />
        <ToastProvider />
      </div>
    );

    expect(screen.getByRole("status")).toHaveTextContent("Carregando registros");
    expect(screen.getByRole("alert")).toHaveTextContent("Falha ao carregar");
    expect(screen.getByRole("heading", { name: "Nenhum registro" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Acesso bloqueado" })
    ).toBeInTheDocument();
  });

  it("renderiza composicoes de formulario e dados sem regra de negocio", () => {
    render(
      <div>
        <FormSection title="Perfil" description="Dados basicos">
          <FieldGroup label="Email" htmlFor="email" hint="Use um email valido">
            <Input id="email" />
          </FieldGroup>
          <SubmitBar submitLabel="Salvar alteracoes" cancelLabel="Cancelar" />
        </FormSection>
        <KpiCard label="Conversao" value="42%" trend="Alta de 8%" />
        <StatusBadge status="success">Ativo</StatusBadge>
      </div>
    );

    expect(screen.getByRole("group", { name: "Perfil" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Salvar alteracoes" })).toBeInTheDocument();
    expect(screen.getByText("42%")).toBeInTheDocument();
    expect(screen.getByText("Ativo")).toBeInTheDocument();
  });
});
