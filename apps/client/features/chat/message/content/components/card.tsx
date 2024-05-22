"use client";

import { readStreamableValue } from "ai/rsc";
import { useEffect, useState } from "react";

import { ComponentProps } from "@/types";
import { Content } from "@/components/content";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ChatMessage } from "@/chat/message/types";
import { cn } from "@/ui/lib";

export type ChatMessageContentCardProps = ComponentProps<
  ChatMessageCardProps,
  Omit<ChatMessage, "node"> & { withAuthor?: boolean }
>;

export function ChatMessageContentCard({
  className,
  content,
  role,
  error,
  createdAt,
  withAuthor = true,
  ...props
}: ChatMessageContentCardProps) {
  const [activeContent, setActiveContent] = useState<string>(typeof content === "string" ? content : "");

  useEffect(() => {
    (async () => {
      if (typeof content === "object") {
        let value = "";
        for await (const token of readStreamableValue(content)) {
          setActiveContent((value += token));
        }
      }
    })();
  }, [content]);

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
