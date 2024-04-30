import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { Loader } from "@/components/loader";
import { Card, CardProps } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export const chatMessageCardVariants = cva("p-4 py-2 flex flex-col gap-2 max-w-full", {
  variants: {
    variant: {
      default: "",
      secondary: "bg-zinc-50 dark:bg-card",
      destructive: "text-destructive border-destructive bg-destructive/10",
    },
  },
});

export type ChatMessageCardProps = ComponentProps<
  CardProps,
  { author?: ReactNode; createdAt?: Date; isLoading?: boolean } & VariantProps<typeof chatMessageCardVariants>
>;

const date = new Date().toLocaleString().split(",")[0];

export function ChatMessageCard({
  children,
  className,
  variant,
  author,
  createdAt,
  isLoading,
  ...props
}: ChatMessageCardProps) {
  const _createdAt = createdAt
    ? createdAt.toLocaleString().startsWith(date)
      ? createdAt.toLocaleTimeString("en-US", { hour12: false })
      : createdAt.toLocaleString("en-US", { hour12: false })
    : undefined;

  if (isLoading) return <Loader className="h-6 w-6" />;

  return (
    <Card
      {...props}
      className={cn(chatMessageCardVariants({ variant }), className)}
    >
      {(author || _createdAt) && (
        <div className="flex items-center justify-between gap-2">
          {author && <h4 className="font-medium first-letter:uppercase">{author}</h4>}
          {_createdAt && <p className="text-muted-foreground ml-auto text-right text-xs">{_createdAt}</p>}
        </div>
      )}
      {children}
    </Card>
  );
}
