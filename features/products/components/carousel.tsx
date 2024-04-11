import { ComponentProps } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselContentProps,
  CarouselItem,
  CarouselItemProps,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@/components/ui/carousel";
import { ProductCard } from "@/product/components/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductsCarouselProps = ComponentProps<
  CarouselProps,
  {
    products: Product[];
    contentProps?: CarouselContentProps;
    itemProps?: CarouselItemProps;
    controllersProps?: ComponentProps<"div">;
  }
>;

export function ProductsCarousel({
  className,
  products,
  contentProps,
  itemProps,
  controllersProps,
  ...props
}: ProductsCarouselProps) {
  return (
    <Carousel
      {...props}
      opts={{ align: "start", dragFree: true }}
      className={cn("w-full", className)}
    >
      <CarouselContent {...contentProps}>
        {products.map((product) => (
          <CarouselItem
            {...itemProps}
            key={product.id}
            className={cn("basis-[calc(theme(spacing.64)+theme(spacing.4))]", itemProps?.className)}
          >
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div
        {...controllersProps}
        className={cn("mt-2 flex w-full max-w-full items-center justify-between", controllersProps?.className)}
      >
        <CarouselPrevious className="static z-[2] translate-y-0" />
        <CarouselNext className="static z-[2] translate-y-0" />
      </div>
    </Carousel>
  );
}
