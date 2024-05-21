"use client";

import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { Dots } from "@/components/dots";
import { hasChatMessagesAtom } from "@/chat/message/atoms/messages";
import { cn } from "@/ui/lib";

export type HeroProps = ComponentProps<"h1">;

export function Hero({ className, ...props }: HeroProps) {
  const hasMessages = useAtomValue(hasChatMessagesAtom);

  if (hasMessages) return null;

  return (
    <h1
      {...props}
      className={cn(
        "max-w-5xl text-center text-5xl font-semibold leading-tight [&+*]:flex-[0_0_auto]",
        className,
      )}
    >
      Try the ultimate e-commerce experience powered by <span className="text-primary">SingleStore and AI</span>
      <Dots />
    </h1>
  );
}
