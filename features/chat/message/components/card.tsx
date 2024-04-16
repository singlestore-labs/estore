import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export const chatMessageCardVariants = cva("p-4 py-2 flex flex-col gap-2", {
  variants: {
    variant: {
      default: "",
      secondary: "bg-zinc-50 dark:bg-card",
    },
  },
});

export type ChatMessageCardProps = ComponentProps<
  CardProps,
  { author?: ReactNode; createdAt?: Date } & VariantProps<typeof chatMessageCardVariants>
>;

const date = new Date().toLocaleString().split(",")[0];

export function ChatMessageCard({
  children,
  className,
  variant,
  author,
  createdAt,
  ...props
}: ChatMessageCardProps) {
  const _createdAt = createdAt
    ? createdAt.toLocaleString().startsWith(date)
      ? createdAt.toLocaleTimeString("en-US", { hour12: false })
      : createdAt.toLocaleString("en-US", { hour12: false })
    : undefined;

  return (
    <Card
      {...props}
      className={cn(chatMessageCardVariants({ variant }), className)}
    >
      {(author || _createdAt) && (
        <div className="flex items-center justify-between gap-2">
          {author && <h4 className="font-medium first-letter:uppercase">{author}</h4>}
          {_createdAt && <p className="ml-auto text-right text-xs text-muted-foreground">{_createdAt}</p>}
        </div>
      )}
      {children}
    </Card>
  );
}
