import { ComponentProps } from "@/types";
import { ChatMessageCard, ChatMessageCardProps } from "@/chat/message/components/card";
import { ProductsCarousel, ProductsCarouselProps } from "@/products/components/carousel";
import { cn } from "@/ui/lib";

export type ChatMessageProductsRecommendedProps = ComponentProps<
  ChatMessageCardProps,
  { products: ProductsCarouselProps["products"] }
>;

export function ChatMessageProductsRecommended({
  children,
  className,
  products,
  ...props
}: ChatMessageProductsRecommendedProps) {
  const _children = children || <p>Here are the recommended products based on your request:</p>;

  return (
    <ChatMessageCard
      variant="secondary"
      {...props}
      className={cn("gap-4 pb-2 pt-4", className)}
    >
      {_children}
      <ProductsCarousel
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
