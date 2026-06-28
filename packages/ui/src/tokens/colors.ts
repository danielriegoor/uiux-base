export const colorTokens = {
  surface: {
    canvas: "hsl(210 24% 98%)",
    panel: "hsl(0 0% 100%)",
    muted: "hsl(210 20% 96%)",
    raised: "hsl(0 0% 100%)"
  },
  text: {
    strong: "hsl(222 47% 11%)",
    body: "hsl(215 25% 27%)",
    muted: "hsl(215 16% 47%)",
    inverse: "hsl(0 0% 100%)"
  },
  border: {
    default: "hsl(214 32% 91%)",
    strong: "hsl(215 20% 65%)"
  },
  intent: {
    primary: "hsl(222 47% 11%)",
    success: "hsl(160 84% 27%)",
    warning: "hsl(32 95% 44%)",
    danger: "hsl(0 72% 51%)",
    info: "hsl(217 91% 50%)"
  }
} as const;

export type ColorTokens = typeof colorTokens;
