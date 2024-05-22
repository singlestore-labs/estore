"use client";

import { useRef, useState, useCallback, useEffect } from "react";

import { ComponentProps } from "@/types";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type DashboardChatCardProps = ComponentProps<CardProps>;

const theme = getTheme();

export function DashboardChatCard({ children, className }: DashboardChatCardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const setSize = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    if (rect.top >= 0) rootRef.current.style.height = `calc(100vh - ${rect.top}px - ${theme.spacing[4]})`;
  }, []);

  useEffect(() => {
    setSize();
    setIsReady(true);
    global.document?.addEventListener("scroll", setSize);
    return () => global.document?.removeEventListener("scroll", setSize);
  }, [setSize]);

  useResizeObserver(rootRef, setSize);

  return (
    <Card
      ref={rootRef}
      className={cn(
        "sticky top-4 z-[2] ml-4 h-screen flex-1 transition-[margin-right] duration-700",
        isOpen ? "mr-0" : "mr-[-100vw]",
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
        Talk to the data
      </Button>

      {children}
    </Card>
  );
}
