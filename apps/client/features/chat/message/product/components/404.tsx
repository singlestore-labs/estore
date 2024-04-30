import { ComponentProps } from "@/types";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";

export type ChatMessageProduct404Props = ComponentProps<ChatMessageCardProps>;

export function ChatMessageProduct404({ children, className, ...props }: ChatMessageProduct404Props) {
  return (
    <ChatMessageCard
      variant="secondary"
      {...props}
      className="py-4"
    >
      No products found.
    </ChatMessageCard>
  );
}
