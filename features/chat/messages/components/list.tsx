"use client";

import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { Fade } from "@/components/fade";
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
          "absolute left-0 top-0 flex h-full w-full flex-col-reverse items-start overflow-y-auto",
          listProps?.className,
        )}
      >
        {messages.map((message, i, arr) => {
          const isSameRole = message.role === arr[i + 1]?.role;
          return (
            <li
              key={message.id}
              className={cn(
                message.role !== "function" && "max-w-[75%]",
                message.role === "function" && "w-full max-w-full",
                message.role === "user" && "self-end",
                isSameRole ? (message.role === "function" ? "mt-8" : "mt-2") : "mt-8",
              )}
            >
              {message.node}
            </li>
          );
        })}
      </ul>

      <Fade
        className="left-0 top-0 z-[2] h-8 w-full"
        direction="b"
      />

      <Fade
        className="bottom-0 left-0 z-[2] h-8 w-full"
        direction="t"
      />
    </div>
  );
}
