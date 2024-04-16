import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { chatMessageCardVariants } from "@/chat/message/components/card";
import { ProductsCarousel, ProductsCarouselProps } from "@/products/components/carousel";
import { cn } from "@/ui/lib";

export type ProductsRecommendedMessageProps = ComponentProps<
  CardProps,
  { products: ProductsCarouselProps["products"] }
>;

export function ProductsRecommendedMessage({
  children = "The following products have been found based on your request:",
  className,
  products,
  ...props
}: ProductsRecommendedMessageProps) {
  return (
    <Card
      {...props}
      className={cn(
        chatMessageCardVariants({ variant: "secondary" }),
        "flex flex-col gap-4 p-4 pb-2",
        className,
      )}
    >
      {children}
      <ProductsCarousel
        products={products}
        className="-mx-4 w-[calc(100%+theme(spacing.8))]"
        itemProps={{
          className:
            "first:pl-8 first:basis-[calc(theme(spacing.64)+theme(spacing.8))] last:pr-4 last:basis-[calc(theme(spacing.64)+theme(spacing.8))]",
        }}
        controllersProps={{ className: "px-4" }}
      />
    </Card>
  );
}
