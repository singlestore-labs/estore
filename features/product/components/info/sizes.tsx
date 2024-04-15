import { ComponentProps } from "@/types";
import { ProductActionSizeSelect, ProductActionSizeSelectProps } from "@/product/components/action/size-select";

export type ProductInfoSizesProps = ComponentProps<ProductActionSizeSelectProps>;

export function ProductInfoSizes({ className, sizes, ...props }: ProductInfoSizesProps) {
  return (
    <ProductActionSizeSelect
      variant="read"
      size="xs"
      {...props}
      sizes={sizes}
    />
  );
}
