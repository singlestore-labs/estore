import { ComponentProps } from "@/types";
import { ProductSizeSelect, ProductSizeSelectProps } from "@/product/size/components/select";
import { cn } from "@/ui/lib";

export type ProductSizesInfoProps = ComponentProps<ProductSizeSelectProps>;

export function ProductSizesInfo({ className, sizes = {}, ...props }: ProductSizesInfoProps) {
  if (!Object.keys(sizes).length) return null;

  return (
    <ProductSizeSelect
      variant="read"
      size="xs"
      {...props}
      className={cn("max-w-24 overflow-x-auto", className)}
      sizes={sizes}
    />
  );
}
