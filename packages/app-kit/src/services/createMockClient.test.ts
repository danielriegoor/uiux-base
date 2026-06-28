import { describe, expect, it } from "vitest";
import { createMockClient, type MockClientRequest } from "../index";

describe("createMockClient", () => {
  it("responde rotas mockadas com o mesmo contrato do ApiClient", async () => {
    const client = createMockClient({
      "GET /items": [{ id: "item-1", name: "Registro" }],
      "POST /items": ({ body }: MockClientRequest) => ({
        id: "item-2",
        ...(body as Record<string, unknown>)
      })
    });

    await expect(client.get("/items")).resolves.toEqual([
      { id: "item-1", name: "Registro" }
    ]);
    await expect(client.post("/items", { name: "Novo" })).resolves.toEqual({
      id: "item-2",
      name: "Novo"
    });
  });

  it("falha com 404 quando a rota mockada nao existe", async () => {
    const client = createMockClient({});

    await expect(client.delete("/missing")).rejects.toMatchObject({
      status: 404
    });
  });
});
