import { ComponentProps } from "@/types";
import { ProductInfoLikes } from "@/product/components/info/likes";
import { ProductInfoSales } from "@/product/components/info/sales";
import { ProductInfoSizes } from "@/product/components/info/sizes";
import { cn } from "@/ui/lib";

export type ProductInfoContainerProps = ComponentProps<"div">;

export function ProductInfoContainer({ className, ...props }: ProductInfoContainerProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <ProductInfoSizes />
      <ProductInfoSales className="ml-auto" />
      <ProductInfoLikes />
    </div>
  );
}
