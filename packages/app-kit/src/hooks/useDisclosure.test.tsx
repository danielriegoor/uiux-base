import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDisclosure } from "../index";

describe("useDisclosure", () => {
  it("controla abertura, fechamento e alternancia", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.isOpen).toBe(false);
  });
});
