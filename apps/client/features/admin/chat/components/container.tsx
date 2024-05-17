"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { getTheme } from "@/ui/get-theme";
import { cn } from "@/ui/lib";

export type AdminChatContrainerProps = ComponentProps<CardProps>;

const theme = getTheme();

export function AdminChatContrainer({ className, ...props }: AdminChatContrainerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const setSize = useCallback(() => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    if (rect.top >= 0) rootRef.current.style.height = `calc(100vh - ${rect.top}px - ${theme.spacing[4]})`;
  }, []);

  useEffect(() => {
    global.document?.addEventListener("scroll", setSize);
    return () => global.document?.removeEventListener("scroll", setSize);
  }, [setSize]);

  useEffect(setSize, [setSize]);

  return (
    <Card
      {...props}
      ref={rootRef}
      className={cn(
        "sticky top-4 z-[2] h-screen rounded-br-none rounded-tr-none border-r-0 transition-[flex] duration-700",
        isOpen ? "-mr-4 ml-4 flex-1" : "translate-x-5",
        className,
      )}
    >
      <Button
        className="absolute -left-8 top-1/2 h-8 origin-[50%_0] -translate-x-1/2 -translate-y-1/2 -rotate-90 overflow-visible rounded-bl-none rounded-br-none"
        onClick={() => setIsOpen((i) => !i)}
      >
        Talk to the data
      </Button>
    </Card>
  );
}
