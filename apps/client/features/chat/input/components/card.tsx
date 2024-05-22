"use client";

import { useAtomValue } from "jotai";
import { useCallback } from "react";

import { ComponentProps, Defined } from "@/types";
import { chatNameAtom } from "@/chat/atoms/config";
import { ChatInputForm, ChatInputFormProps } from "@/chat/input/components/form";
import { useHasChatMessagesAtomValue } from "@/chat/message/atoms/messages";
import { useSubmitMessage } from "@/chat/message/hooks/use-submit";
import { ChatShortcutList, ChatShortcutListProps } from "@/chat/shortcut/components/list";
import { store } from "@/store";
import { cn } from "@/ui/lib";

export type ChatInputCardProps = ComponentProps<"div", { formProps?: ChatInputFormProps }>;

export function ChatInputCard({ className, formProps, ...props }: ChatInputCardProps) {
  const chatName = useAtomValue(chatNameAtom);
  const hasMessages = useAtomValue(useHasChatMessagesAtomValue(chatName), { store });
  const { submit, isLoading } = useSubmitMessage();

  const handleFormSubmit = useCallback<Defined<ChatInputFormProps["onSubmit"]>>(
    async (values) => await submit(values.content),
    [submit],
  );

  const handleShortcut = useCallback<Defined<ChatShortcutListProps["onShortcut"]>>(
    async (shortcut) => await submit(shortcut.prompt || shortcut.title),
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
        {...formProps}
        placeholder={hasMessages ? "Message" : formProps?.placeholder}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </div>
  );
}
