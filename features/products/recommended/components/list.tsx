import { ComponentProps } from "@/types";
import { Content, ContentProps } from "@/components/content";
import { Card, CardProps } from "@/components/ui/card";
import { chatMessageCardVariants } from "@/chat/message/components/card";
import { ProductsCarousel, ProductsCarouselProps } from "@/products/components/carousel";
import { cn } from "@/ui/lib";

export type ProductsRecommendedListProps = ComponentProps<
  CardProps,
  {
    content?: ContentProps["children"];
    products: ProductsCarouselProps["products"];
  }
>;

export function ProductsRecommendedList({
  className,
  content = "The following products have been found based on your request:",
  products,
  ...props
}: ProductsRecommendedListProps) {
  return (
    <Card
      {...props}
      className={cn(
        chatMessageCardVariants({ variant: "secondary" }),
        "px-4 pb-2 pt-0",
        content && "pt-4",
        className,
      )}
    >
      {content && <Content className="mb-4">{content}</Content>}
      <ProductsCarousel
        products={products}
        className="-mx-4 w-[calc(100%+theme(spacing.8))]"
        itemProps={{
          className: cn(
            content &&
              "first:pl-8 first:basis-[calc(theme(spacing.64)+theme(spacing.8))] last:pr-4 last:basis-[calc(theme(spacing.64)+theme(spacing.8))]",
          ),
        }}
        controllersProps={{ className: "px-4" }}
      />
    </Card>
  );
}
