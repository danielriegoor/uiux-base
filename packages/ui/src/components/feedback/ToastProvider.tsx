import { Toaster, toast } from "sonner";
import type { ComponentProps } from "react";

export type ToastProviderProps = ComponentProps<typeof Toaster>;

export function ToastProvider(props: ToastProviderProps) {
  return (
    <Toaster
      closeButton
      position="top-right"
      richColors
      toastOptions={{
        duration: 4000
      }}
      {...props}
    />
  );
}

export { toast };
