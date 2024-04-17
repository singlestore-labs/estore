import { ComponentProps } from "@/types";
import { ProductSizeSelect, ProductSizeSelectProps } from "@/product/size/components/select";

export type ProductSizesInfoProps = ComponentProps<ProductSizeSelectProps>;

export function ProductSizesInfo({ className, sizes, ...props }: ProductSizesInfoProps) {
  return (
    <ProductSizeSelect
      variant="read"
      size="xs"
      {...props}
      sizes={sizes}
    />
  );
}
