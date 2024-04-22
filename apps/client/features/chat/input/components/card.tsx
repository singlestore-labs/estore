"use client";

import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { ComponentProps, Defined } from "@/types";
import { ChatInputForm, ChatInputFormProps } from "@/chat/input/components/form";
import { hasMessagesAtom } from "@/chat/message/atoms/messages";
import { useSubmitMessage } from "@/chat/message/hooks/use-submit";
import { ChatShortcutList, ChatShortcutListProps } from "@/chat/shortcut/components/list";
import { cn } from "@/ui/lib";

export type ChatInputCardProps = ComponentProps<"div">;

export function ChatInputCard({ className, ...props }: ChatInputCardProps) {
  const hasMessages = useAtomValue(hasMessagesAtom);
  const { submit, isLoading } = useSubmitMessage();

  const handleFormSubmit = useCallback<Defined<ChatInputFormProps["onSubmit"]>>(
    async (values) => {
      await submit(values.content);
    },
    [submit],
  );

  const handleShortcut = useCallback<Defined<ChatShortcutListProps["onShortcut"]>>(
    async (shortcut) => {
      await submit(shortcut.prompt || shortcut.title);
    },
    [submit],
  );

  return (
    <div
      {...props}
      className={cn("flex w-full max-w-full flex-col gap-2", className)}
    >
      <ChatShortcutList
        isDisabled={isLoading}
        onShortcut={handleShortcut}
      />
      <ChatInputForm
        placeholder={hasMessages ? "Message" : "Describe the product you wish to buy"}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </div>
  );
}
