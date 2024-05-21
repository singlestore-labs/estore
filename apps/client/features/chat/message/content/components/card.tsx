"use client";

import { readStreamableValue } from "ai/rsc";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { ComponentProps } from "@/types";
import { Content } from "@/components/content";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ChatMessage } from "@/chat/message/types";
import { chatShortcutsAtom } from "@/chat/shortcut/atoms/shortcuts";
import { ChatShortcut } from "@/chat/shortcut/types";
import { cn } from "@/ui/lib";

export type ChatMessageContentCardProps = ComponentProps<
  ChatMessageCardProps,
  Omit<ChatMessage, "node"> & { withAuthor?: boolean }
>;

function parseContent(content: ChatMessageContentCardProps["content"], shortcuts: ChatShortcut[]) {
  if (typeof content !== "string") return content;

  const shortcutMask = shortcuts.find((i) => i.prompt === content);
  if (shortcutMask) return shortcutMask.title;

  return content;
}

export function ChatMessageContentCard({
  className,
  content,
  role,
  error,
  createdAt,
  withAuthor = true,
  ...props
}: ChatMessageContentCardProps) {
  const shortcuts = useAtomValue(chatShortcutsAtom);
  const _content = role === "user" ? parseContent(content, shortcuts) : content;
  const [activeContent, setActiveContent] = useState<string>(typeof _content === "string" ? _content : "");

  useEffect(() => {
    (async () => {
      if (typeof _content === "object") {
        let value = "";
        for await (const token of readStreamableValue(_content)) {
          setActiveContent((value += token));
        }
      }
    })();
  }, [_content]);

  return (
    <ChatMessageCard
      variant={error ? "destructive" : role === "assistant" ? "secondary" : "default"}
      {...props}
      className={cn("max-w-[75%] gap-0", role === "user" ? "ml-auto" : "mr-auto", className)}
      createdAt={!error ? createdAt : undefined}
      author={!error && withAuthor ? role : undefined}
    >
      <Content>{error || activeContent}</Content>
    </ChatMessageCard>
  );
}
