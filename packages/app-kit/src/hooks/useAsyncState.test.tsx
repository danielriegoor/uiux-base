import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useAsyncState } from "../index";

describe("useAsyncState", () => {
  it("executa fluxo async com estados idle, loading e success", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    expect(result.current.status).toBe("idle");

    await act(async () => {
      await expect(result.current.run(() => Promise.resolve("pronto"))).resolves.toBe(
        "pronto"
      );
    });

    expect(result.current.status).toBe("success");
    expect(result.current.data).toBe("pronto");
    expect(result.current.isSuccess).toBe(true);
  });

  it("registra erro e permite reset", async () => {
    const { result } = renderHook(() => useAsyncState<string>());

    await act(async () => {
      await expect(
        result.current.run(() => Promise.reject(new Error("Falha controlada")))
      ).rejects.toThrow("Falha controlada");
    });

    expect(result.current.status).toBe("error");
    expect(result.current.error).toBeInstanceOf(Error);

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.error).toBeUndefined();
  });
});
