import { ComponentProps } from "@/types";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ProductCard } from "@/product/components/card";
import { Product } from "@/product/types";

export type ChatMessageProductCardProps = ComponentProps<ChatMessageCardProps, { product: Product }>;

export function ChatMessageProductCard({
  children,
  className,
  product,
  ...props
}: ChatMessageProductCardProps) {
  const _children = children || <p>Here is the recommended product based on your request:</p>;

  return (
    <ChatMessageCard
      variant="secondary"
      {...props}
      className="max-w-min gap-4 py-4"
    >
      {_children}
      <ProductCard {...product} />
    </ChatMessageCard>
  );
}
