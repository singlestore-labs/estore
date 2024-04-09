import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

import { ComponentProps, Defined } from "@/types";
import { ChatInputForm, ChatInputFormProps } from "@/chat/input/components/form";
import { createChatMessage } from "@/chat/message/lib/create";
import { chatMessagesAtom, hasMessagesAtom } from "@/chat/messages/atom";
import { cn } from "@/ui/lib";

export type ChatInputCardProps = ComponentProps<"div">;

export function ChatInputCard({ className, ...props }: ChatInputCardProps) {
  const setMessages = useSetAtom(chatMessagesAtom);
  const hasMessages = useAtomValue(hasMessagesAtom);

  const handleFormSubmit = useCallback<Defined<ChatInputFormProps["onSubmit"]>>(
    (values) => {
      const userMessage = createChatMessage({ role: "user", content: values.content });
      setMessages((i) => [userMessage, ...i]);
    },
    [setMessages],
  );

  return (
    <div
      {...props}
      className={cn("w-full max-w-full", className)}
    >
      <ChatInputForm
        placeholder={hasMessages ? "Message" : "Describe the product you wish to buy"}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
