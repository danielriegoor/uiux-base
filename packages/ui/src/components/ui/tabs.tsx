import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex min-h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-600",
      className
    )}
    ref={ref}
    {...props}
  />
));

TabsList.displayName = TabsPrimitive.List.displayName;

export const TabsTrigger = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex min-h-8 items-center justify-center rounded px-3 py-1 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm",
      className
    )}
    ref={ref}
    {...props}
  />
));

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
      className
    )}
    ref={ref}
    {...props}
  />
));

TabsContent.displayName = TabsPrimitive.Content.displayName;
