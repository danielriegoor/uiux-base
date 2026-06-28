import { useCallback, useState } from "react";

export type UseDisclosureOptions = {
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export type UseDisclosureResult = {
  close: () => void;
  isOpen: boolean;
  open: () => void;
  setOpen: (isOpen: boolean) => void;
  toggle: () => void;
};

export function useDisclosure({
  defaultOpen = false,
  onOpenChange
}: UseDisclosureOptions = {}): UseDisclosureResult {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const setOpen = useCallback(
    (nextIsOpen: boolean) => {
      setIsOpen(nextIsOpen);
      onOpenChange?.(nextIsOpen);
    },
    [onOpenChange]
  );

  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggle = useCallback(() => {
    setIsOpen((current) => {
      const next = !current;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  return {
    close,
    isOpen,
    open,
    setOpen,
    toggle
  };
}
