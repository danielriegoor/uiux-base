import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export type ThemeToggleProps = {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  className?: string;
  lightLabel?: string;
  darkLabel?: string;
};

export function ThemeToggle({
  theme,
  onThemeChange,
  className,
  lightLabel = "Ativar tema claro",
  darkLabel = "Ativar tema escuro"
}: ThemeToggleProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = nextTheme === "dark" ? darkLabel : lightLabel;
  const Icon = nextTheme === "dark" ? Moon : Sun;

  return (
    <Button
      aria-label={label}
      className={className}
      onClick={() => onThemeChange(nextTheme)}
      size="icon"
      title={label}
      type="button"
      variant="outline"
    >
      <Icon aria-hidden="true" />
    </Button>
  );
}
