export const spacingTokens = {
  component: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem"
  },
  layout: {
    section: "2rem",
    page: "3rem",
    shell: "4rem"
  },
  radius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem"
  }
} as const;

export type SpacingTokens = typeof spacingTokens;
