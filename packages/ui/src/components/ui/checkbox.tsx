import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    className={cn(
      "peer flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[var(--ui-accent-solid)] data-[state=checked]:bg-[var(--ui-accent-solid)] data-[state=checked]:text-[var(--ui-on-accent)]",
      className
    )}
    ref={ref}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check aria-hidden="true" className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
