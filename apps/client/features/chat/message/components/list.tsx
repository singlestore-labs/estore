"use client";

import { useAtomValue } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Fade, FadeProps } from "@/components/fade";
import { useChatMessagesAtomValue } from "@/chat/message/atoms/messages";
import { Chat } from "@/chat/types";
import { cn } from "@/ui/lib";

export type ChatMessageListProps = ComponentProps<
  "div",
  { chatName: Chat["name"]; emptyChildren?: ReactNode; listProps?: ComponentProps<"ul">; fadeProps?: FadeProps }
>;

export function ChatMessageList({
  className,
  chatName,
  emptyChildren,
  listProps,
  fadeProps,
  ...props
}: ChatMessageListProps) {
  const messages = useAtomValue(useChatMessagesAtomValue(chatName));

  return (
    <div
      {...props}
      className={cn("relative w-full max-w-full", className)}
    >
      <div className="absolute left-0 top-0 flex h-full w-full max-w-full flex-col-reverse overflow-y-auto overflow-x-hidden py-8">
        {messages.length ? (
          <ul
            {...listProps}
            className={cn(
              `relative left-1/2 flex w-full max-w-full -translate-x-[calc(50%-(var(--scrollbar-width)/2))] flex-col-reverse`,
              listProps?.className,
            )}
          >
            {messages.map((message, i, arr) => {
              const isSameRole = message.role === arr[i + 1]?.role;

              return (
                <li
                  key={message.id}
                  className={cn(isSameRole ? "mt-2" : "mt-8", "flex w-full max-w-full last:mt-0")}
                >
                  {message.node}
                </li>
              );
            })}
          </ul>
        ) : (
          emptyChildren
        )}
      </div>

      {!!messages.length && (
        <>
          <Fade
            {...fadeProps}
            className={cn("left-0 top-0 z-[2] h-8 w-full", fadeProps?.className)}
            direction="b"
          />

          <Fade
            {...fadeProps}
            className={cn("bottom-0 left-0 z-[2] h-8 w-full", fadeProps?.className)}
            direction="t"
          />
        </>
      )}
    </div>
  );
}
