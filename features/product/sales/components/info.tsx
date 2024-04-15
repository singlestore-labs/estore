import { TrendingUp } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { cn } from "@/ui/lib";

export type ProductSalesInfoProps = ComponentProps<ProductInfoItemProps>;

export function ProductSalesInfo({ className, value, ...props }: ProductSalesInfoProps) {
  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={TrendingUp}
      label="Sales for the last 3 days"
    />
  );
}
