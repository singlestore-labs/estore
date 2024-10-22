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
        "max-w-5xl px-6 text-center text-5xl font-semibold leading-tight max-lg:text-4xl max-md:text-3xl [&+*]:flex-[0_0_auto]",
        className,
      )}
    >
      Try the clothing shopping experience with <span className="text-primary">SingleStore and AI</span>
      <Dots />
    </h1>
  );
}
