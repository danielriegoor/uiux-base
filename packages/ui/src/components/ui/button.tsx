import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ui-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--ui-accent-solid)] text-[var(--ui-on-accent)] hover:bg-[var(--ui-accent-hover)]",
        secondary: "bg-[var(--ui-surface-muted)] text-[var(--ui-text-strong)] hover:bg-[var(--ui-border-default)]",
        outline:
          "border border-[var(--ui-border-strong)] bg-[var(--ui-surface-panel)] text-[var(--ui-text-body)] hover:bg-[var(--ui-surface-subtle)]",
        ghost: "text-[var(--ui-text-body)] hover:bg-[var(--ui-surface-muted)] hover:text-[var(--ui-text-strong)]",
        destructive: "bg-[var(--ui-danger-solid)] text-[var(--ui-on-accent)] hover:bg-[var(--ui-danger-hover)]"
      },
      size: {
        sm: "h-11 px-3",
        md: "h-11 px-4",
        lg: "h-11 px-5",
        icon: "h-11 w-11 p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  asChild = false,
  className,
  size,
  type = "button",
  variant,
  ...props
}, ref) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      type={asChild ? undefined : type}
      {...props}
    />
  );
});

Button.displayName = "Button";
