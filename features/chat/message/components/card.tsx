import { VariantProps, cva } from "class-variance-authority";
import Markdown from "react-markdown";

import { ComponentProps } from "@/types";
import { Content } from "@/components/content";
import { Card, CardProps } from "@/components/ui/card";
import { ChatMessage } from "@/chat/message/types";
import { cn } from "@/ui/lib";

export const chatMessageCardVariants = cva("p-4 py-2", {
  variants: {
    variant: {
      default: "",
      secondary: "bg-zinc-50",
    },
  },
});

export type ChatMessageCardProps = ComponentProps<
  CardProps,
  Omit<ChatMessage, "node"> & { withAuthor?: boolean } & VariantProps<typeof chatMessageCardVariants>
>;

const date = new Date().toLocaleString().split(",")[0];

export function ChatMessageCard({
  className,
  variant,
  content,
  role,
  createdAt,
  withAuthor = true,
  ...props
}: ChatMessageCardProps) {
  const _createdAt = createdAt.toLocaleString().startsWith(date)
    ? createdAt.toLocaleTimeString("en-US", { hour12: false })
    : createdAt.toLocaleString("en-US", { hour12: false });

  return (
    <Card
      {...props}
      className={cn(chatMessageCardVariants({ variant }), className)}
    >
      <div className="flex items-center justify-between gap-2">
        {withAuthor && <h4 className="font-medium first-letter:uppercase">{role}</h4>}
        <p className="ml-auto text-right text-xs text-muted-foreground">{_createdAt}</p>
      </div>
      <Content>{content}</Content>
    </Card>
  );
}
