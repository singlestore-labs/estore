import { useAtomValue } from "jotai";

import { ComponentProps } from "@/types";
import { hasMessagesAtom } from "@/chat/message/atoms/messages";
import { ChatMessageActionClear } from "@/chat/message/components/action/clear";
import { cn } from "@/ui/lib";

export type ChatToolbarProps = ComponentProps<"div">;

export function ChatToolbar({ className, ...props }: ChatToolbarProps) {
  const hasMessages = useAtomValue(hasMessagesAtom);
  if (!hasMessages) return null;

  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <ChatMessageActionClear />
    </div>
  );
}
