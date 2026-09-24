import { describe, expect, it } from "vitest";
import { workspaceConfig } from "./index";

describe("workspaceConfig", () => {
  it("descreve os apps, packages e scripts raiz da fundacao", () => {
    expect(workspaceConfig.apps).toEqual(["starter", "demo"]);
    expect(workspaceConfig.packages).toEqual([
      "uiux-base",
      "uiux-base-app-kit",
      "@uiux-base/config"
    ]);
    expect(workspaceConfig.requiredRootScripts).toEqual([
      "lint",
      "test",
      "build",
      "typecheck",
      "check"
    ]);
  });
});
