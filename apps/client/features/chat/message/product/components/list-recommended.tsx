import { ComponentProps } from "@/types";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ProductListCarousel, ProductListCarouselProps } from "@/product/components/list-carousel";
import { cn } from "@/ui/lib";

export type ChatMessageProductListRecommendedProps = ComponentProps<
  ChatMessageCardProps,
  { products: ProductListCarouselProps["products"] }
>;

export function ChatMessageProductListRecommended({
  children,
  className,
  products,
  ...props
}: ChatMessageProductListRecommendedProps) {
  const _children = children || <p>Here are the recommended products based on your request:</p>;

  return (
    <ChatMessageCard
      variant="secondary"
      {...props}
      className={cn("gap-4 pb-2 pt-4", className)}
    >
      {_children}
      <ProductListCarousel
        products={products}
        className="-mx-4 w-[calc(100%+theme(spacing.8))]"
        itemProps={{
          className:
            "first:pl-8 first:basis-[calc(theme(spacing.64)+theme(spacing.8))] last:pr-4 last:basis-[calc(theme(spacing.64)+theme(spacing.8))]",
        }}
        controllersProps={{ className: "px-4" }}
      />
    </ChatMessageCard>
  );
}
