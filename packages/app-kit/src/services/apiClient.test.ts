import { describe, expect, it, vi } from "vitest";
import { ApiClientError, createApiClient } from "../index";

describe("createApiClient", () => {
  it("envia requisicoes JSON com baseUrl, headers e parse da resposta", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "item-1" }), {
        headers: { "Content-Type": "application/json" },
        status: 200
      })
    );
    const client = createApiClient({
      baseUrl: "https://example.test/api",
      fetcher,
      headers: { "X-App": "starter" }
    });

    await expect(client.post("/items", { name: "Registro" })).resolves.toEqual({
      id: "item-1"
    });

    expect(fetcher).toHaveBeenCalledWith(
      "https://example.test/api/items",
      expect.objectContaining({
        body: JSON.stringify({ name: "Registro" }),
        headers: expect.objectContaining({
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-App": "starter"
        }),
        method: "POST"
      })
    );
  });

  it("mantem baseUrl relativa para apps servidos pelo mesmo dominio", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify([{ id: "item-1" }]), {
        headers: { "Content-Type": "application/json" },
        status: 200
      })
    );
    const client = createApiClient({
      baseUrl: "/api",
      fetcher
    });

    await client.get("/items", { query: { page: 2, search: "ativo" } });

    expect(fetcher).toHaveBeenCalledWith(
      "/api/items?page=2&search=ativo",
      expect.objectContaining({ method: "GET" })
    );
  });

  it("lanca ApiClientError com status e corpo quando a API falha", async () => {
    const fetcher = vi.fn().mockImplementation(() =>
      Promise.resolve(
        new Response(JSON.stringify({ message: "Sem acesso" }), {
          headers: { "Content-Type": "application/json" },
          status: 403,
          statusText: "Forbidden"
        })
      )
    );
    const client = createApiClient({ fetcher });

    await expect(client.get("/blocked")).rejects.toMatchObject({
      body: { message: "Sem acesso" },
      status: 403,
      statusText: "Forbidden"
    });

    await expect(client.get("/blocked")).rejects.toBeInstanceOf(ApiClientError);
  });
});
