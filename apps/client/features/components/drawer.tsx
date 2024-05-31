"use client";

import { useRef, useState, useCallback, useEffect, ReactNode, useId } from "react";

import { ComponentProps } from "@/types";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DrawerProps = ComponentProps<
  CardProps,
  { maxWidth?: string; offsetY?: string; triggerChildren?: ReactNode }
>;

const theme = getTheme();

export function Drawer({
  children,
  className,
  maxWidth = "",
  offsetY,
  triggerChildren = "Expand",
}: DrawerProps) {
  const id = useId();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const setSize = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    if (rect.top >= 0)
      rootRef.current.style.height = `calc(100vh - ${rect.top}px - ${theme.spacing[4]}${offsetY ? ` - ${offsetY}` : ""})`;
  }, [offsetY]);

  useEffect(() => {
    setSize();
    setIsReady(true);
    global.document?.addEventListener("scroll", setSize);
    return () => global.document?.removeEventListener("scroll", setSize);
  }, [setSize]);

  useResizeObserver(rootRef, setSize);

  useEffect(() => {
    if (!maxWidth) return;
    document.documentElement.style.setProperty(`--drawer-max-width`, maxWidth);
  }, [maxWidth]);

  return (
    <Card
      ref={rootRef}
      className={cn(
        `sticky top-4 z-[2] h-screen max-w-[var(--drawer-max-width)] flex-1 transition-[margin-right] duration-700`,
        isOpen ? "mr-4" : `-mr-[calc(var(--drawer-max-width)_+_theme(spacing.4))]`,
        !isReady && "hidden",
        className,
      )}
    >
      <Button
        className={cn(
          "absolute left-0 top-1/2 h-8 origin-[50%_0] -translate-x-1/2 -translate-y-1/2 -rotate-90 overflow-visible rounded-bl-none rounded-br-none",
          isReady && "animate-[admin-chat-trigger_0.7s_ease-out_forwards]",
        )}
        onClick={() => setIsOpen((i) => !i)}
      >
        {triggerChildren}
      </Button>

      {children}
    </Card>
  );
}
