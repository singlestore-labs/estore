import { Heart } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductLikesInfoProps = ComponentProps<ProductInfoItemProps, { value: Product["likes"] }>;

export function ProductLikesInfo({ className, value, ...props }: ProductLikesInfoProps) {
  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={Heart}
      label="Likes"
    >
      {value}
    </ProductInfoItem>
  );
}
