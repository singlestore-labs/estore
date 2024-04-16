"use client";

import { useAtomValue } from "jotai";
import { useRef } from "react";

import { ComponentProps } from "@/types";
import { useSetScrollbarWidth } from "@/hooks/use-set-scrollbar-width";
import { Fade } from "@/components/fade";
import { chatMessagesAtom } from "@/chat/message/atoms/messages";
import { cn } from "@/ui/lib";

export type ChatMessageListProps = ComponentProps<"div", { listProps?: ComponentProps<"ul"> }>;

export function ChatMessageList({ className, listProps, ...props }: ChatMessageListProps) {
  const scrollbarRef = useRef<HTMLDivElement>(null);
  useSetScrollbarWidth(scrollbarRef);

  const messages = useAtomValue(chatMessagesAtom);
  if (!messages.length) return null;

  return (
    <div
      {...props}
      className={cn("relative w-full max-w-full", className)}
    >
      <div
        ref={scrollbarRef}
        className="absolute left-0 top-0 flex h-full w-full max-w-full flex-col-reverse overflow-x-hidden overflow-y-scroll py-8 "
      >
        <ul
          {...listProps}
          className={cn(
            `relative left-1/2 flex w-full max-w-full -translate-x-[calc(50%-(var(--scrollbar-width)/2))] flex-col-reverse gap-8`,
            listProps?.className,
          )}
        >
          {messages.map((message) => (
            <li
              key={message.id}
              className={cn(
                message.role !== "function" && "max-w-[75%]",
                message.role === "function" && "w-full max-w-full",
                message.role === "user" && "self-end",
              )}
            >
              {message.node}
            </li>
          ))}
        </ul>
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
