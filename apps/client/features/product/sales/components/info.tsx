import { TrendingUp } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { getProductSalesMessage } from "@/product/sales/lib/get-message";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductSalesInfoProps = ComponentProps<ProductInfoItemProps, { value: Product["sales"] }>;

export function ProductSalesInfo({ className, value = [], ...props }: ProductSalesInfoProps) {
  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={TrendingUp}
      label={getProductSalesMessage(value.length)}
    >
      {value.reduce((a, b) => a + b.value, 0)}
    </ProductInfoItem>
  );
}
