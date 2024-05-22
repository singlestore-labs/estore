"use client";

import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { Dots } from "@/components/dots";
import { useHasChatMessagesAtomValue } from "@/chat/message/atoms/messages";
import { Chat } from "@/chat/types";
import { cn } from "@/ui/lib";

export type HeroProps = ComponentProps<"h1", { chatName: Chat["name"] }>;

export function Hero({ className, chatName, ...props }: HeroProps) {
  const messages = useAtomValue(useHasChatMessagesAtomValue(chatName));

  if (messages) return null;

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
