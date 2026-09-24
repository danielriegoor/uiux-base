import { themeTokens } from "./theme.generated";

export const spacingTokens = {
  component: themeTokens.shared.space.component,
  layout: themeTokens.shared.space.layout,
  radius: themeTokens.shared.radius
} as const;

export type SpacingTokens = typeof spacingTokens;
