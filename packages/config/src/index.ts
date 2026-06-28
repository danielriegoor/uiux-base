export const workspaceConfig = {
  apps: ["starter", "demo"],
  packages: ["@uiux-base/ui", "@uiux-base/app-kit", "@uiux-base/config"],
  requiredRootScripts: ["lint", "test", "build", "typecheck", "check"]
} as const;

export type WorkspaceConfig = typeof workspaceConfig;
