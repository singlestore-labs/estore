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
  withAuthor = true,
  ...props
}: ChatMessageContentCardProps) {
  return (
    <ChatMessageCard
      variant={role === "assistant" ? "secondary" : "default"}
      {...props}
      className={cn("gap-0", className)}
      author={withAuthor ? role : undefined}
    >
      <Content>{content}</Content>
    </ChatMessageCard>
  );
}
