import humanNumber from "human-number";
import { TrendingUp } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductSalesInfoProps = ComponentProps<ProductInfoItemProps, { value: Product["sales"] }>;

export function ProductSalesInfo({ className, value = [], ...props }: ProductSalesInfoProps) {
  const _value = value.reduce((a, b) => a + b.value, 0);

  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={TrendingUp}
      label="Last 3 months sales"
    >
      {_value > 1000 ? humanNumber(_value, (i) => i.toFixed(0)) : _value}
    </ProductInfoItem>
  );
}
