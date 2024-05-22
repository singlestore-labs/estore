import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { chatNameAtom } from "@/chat/atoms/config";
import { ChatActionClear } from "@/chat/components/action/clear";
import { useHasChatMessagesAtomValue } from "@/chat/message/atoms/messages";
import { store } from "@/store";
import { cn } from "@/ui/lib";

export type ChatToolbarProps = ComponentProps<"div">;

export function ChatToolbar({ className, ...props }: ChatToolbarProps) {
  const chatName = useAtomValue(chatNameAtom);
  const hasMessages = useAtomValue(useHasChatMessagesAtomValue(chatName), { store });
  if (!hasMessages) return null;

  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <ChatActionClear />
    </div>
  );
}
