"use client";

import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { chatMessagesAtom } from "@/chat/messages/atom";
import { cn } from "@/ui/lib";

export type ChatMessageListProps = ComponentProps<"div", { listProps?: ComponentProps<"ul"> }>;

export function ChatMessageList({ className, listProps, ...props }: ChatMessageListProps) {
  const messages = useAtomValue(chatMessagesAtom);

  if (!messages.length) return null;

  return (
    <div
      {...props}
      className={cn("relative flex w-full max-w-full flex-1", className)}
    >
      <ul
        {...listProps}
        className={cn(
          "absolute left-0 top-0 flex h-full w-full flex-col-reverse items-start gap-4 overflow-y-auto overflow-x-hidden",
          listProps?.className,
        )}
      >
        {messages.map((message) => (
          <li
            key={message.id}
            className={cn(message.role !== "function" && "max-w-[75%]", message.role === "user" && "self-end")}
          >
            {message.node}
          </li>
        ))}
      </ul>
    </div>
  );
}
