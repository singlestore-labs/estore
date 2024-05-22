"use client";

import { useAtomValue } from "jotai";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Fade } from "@/components/fade";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { cn } from "@/ui/lib";

export type ChatMessageListProps = ComponentProps<
  "div",
  { emptyChildren?: ReactNode; listProps?: ComponentProps<"ul"> }
>;

export function ChatMessageList({ className, emptyChildren, listProps, ...props }: ChatMessageListProps) {
  const messages = useAtomValue(chatMessagesAtom);

  return (
    <div
      {...props}
      className={cn("relative w-full max-w-full", className)}
    >
      <div className="absolute left-0 top-0 flex h-full w-full max-w-full flex-col-reverse overflow-x-hidden overflow-y-scroll py-8">
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
