"use client";

import { ComponentProps } from "@/types";
import { ChatInputCard } from "@/chat/input/components/card";
import { ChatMessageList } from "@/chat/messages/components/list";
import { cn } from "@/ui/lib";

export type ChatContainerProps = ComponentProps<"div">;

export function ChatContainer({ className, ...props }: ChatContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-8",
        className,
      )}
    >
      <ChatMessageList />
      <ChatInputCard />
    </div>
  );
}
