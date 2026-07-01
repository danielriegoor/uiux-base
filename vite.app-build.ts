import type { UserConfig } from "vite";

export const appBuildOptions = {
  rolldownOptions: {
    output: {
      codeSplitting: {
        groups: [
          {
            name: "vendor-react",
            test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
            priority: 30
          },
          {
            name: "vendor-charts",
            test: /node_modules[\\/](recharts|victory-vendor|d3-[^\\/]+)[\\/]/,
            priority: 25
          },
          {
            name: "vendor-table",
            test: /node_modules[\\/]@tanstack[\\/](react-table|table-core)[\\/]/,
            priority: 25
          },
          {
            name: "vendor-radix",
            test: /node_modules[\\/]@radix-ui[\\/]/,
            priority: 20
          },
          {
            name: "vendor-icons",
            test: /node_modules[\\/]lucide-react[\\/]/,
            priority: 20
          },
          {
            name: "vendor-feedback",
            test: /node_modules[\\/](sonner|cmdk|class-variance-authority|clsx|tailwind-merge)[\\/]/,
            priority: 15
          },
          {
            name: "vendor",
            test: /node_modules[\\/]/,
            priority: 1
          }
        ]
      }
    }
  }
} satisfies UserConfig["build"];
