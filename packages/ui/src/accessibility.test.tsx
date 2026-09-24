import axe from "axe-core";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, FieldGroup, FormSection, Input } from "./index";

describe("acessibilidade estrutural de uiux-base", () => {
  it("nao encontra violacoes automaticas no formulario representativo", async () => {
    const { container } = render(
      <main>
        <FormSection
          description="Preencha somente os dados essenciais."
          title="Cadastro rapido"
        >
          <FieldGroup htmlFor="display-name" label="Nome" required>
            <Input id="display-name" required />
          </FieldGroup>
          <Button type="submit">Salvar</Button>
        </FormSection>
      </main>
    );

    const result = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } }
    });

    expect(result.violations).toEqual([]);
  });
});
