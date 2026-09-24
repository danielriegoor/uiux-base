import { themeTokens } from "./theme.generated";

export { themeTokens, type ThemeTokens } from "./theme.generated";

export const colorTokens = {
  surface: themeTokens.light.surface,
  text: themeTokens.light.text,
  border: themeTokens.light.border,
  intent: {
    primary: themeTokens.light.accent.solid,
    success: themeTokens.light.success.solid,
    warning: themeTokens.light.warning.solid,
    danger: themeTokens.light.danger.solid,
    info: themeTokens.light.info.solid
  }
} as const;

export type ColorTokens = typeof colorTokens;
