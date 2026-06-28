import { describe, expect, it } from "vitest";
import { createAppMetadata } from "./index";

describe("createAppMetadata", () => {
  it("normaliza metadados neutros de um app do template", () => {
    expect(
      createAppMetadata({ name: "Starter", packageName: "starter" })
    ).toEqual({
      name: "Starter",
      packageName: "starter",
      status: "foundation-ready"
    });
  });
});
