export const chartTokens = {
  series: [
    "hsl(217 91% 50%)",
    "hsl(160 84% 39%)",
    "hsl(32 95% 44%)",
    "hsl(262 83% 58%)",
    "hsl(0 72% 51%)"
  ],
  grid: "hsl(214 32% 91%)",
  axis: "hsl(215 16% 47%)",
  tooltip: {
    background: "hsl(0 0% 100%)",
    border: "hsl(214 32% 91%)",
    text: "hsl(222 47% 11%)"
  }
} as const;

export type ChartTokens = typeof chartTokens;
