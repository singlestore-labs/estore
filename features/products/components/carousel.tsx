import { ComponentProps } from "@/types";
import { Fade } from "@/components/fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselProps,
} from "@/components/ui/carousel";
import { ProductCard } from "@/product/components/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductsCarouselProps = ComponentProps<CarouselProps, { products: Product[] }>;

export function ProductsCarousel({ className, products, ...props }: ProductsCarouselProps) {
  return (
    <Carousel
      {...props}
      opts={{ align: "start", dragFree: true }}
      className={cn("w-full", className)}
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className={cn("basis-64")}
          >
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-2 flex w-full max-w-full items-center justify-between">
        <CarouselPrevious className="static z-[2] translate-y-0" />
        <CarouselNext className="static z-[2] translate-y-0" />
      </div>

      <Fade
        className={cn("left-0 top-0 h-full w-8")}
        direction="r"
      />

      <Fade
        className={cn("right-0 top-0 h-full w-8")}
        direction="l"
      />
    </Carousel>
  );
}
