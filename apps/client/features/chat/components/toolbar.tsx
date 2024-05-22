import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { ChatActionClear } from "@/chat/components/action/clear";
import { useHasChatMessagesAtomValue } from "@/chat/message/atoms/messages";
import { Chat } from "@/chat/types";
import { cn } from "@/ui/lib";

export type ChatToolbarProps = ComponentProps<"div", { chatName: Chat["name"] }>;

export function ChatToolbar({ className, chatName, ...props }: ChatToolbarProps) {
  const hasMessages = useAtomValue(useHasChatMessagesAtomValue(chatName));
  if (!hasMessages) return null;

  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <ChatActionClear chatName={chatName} />
    </div>
  );
}
