import { Heart } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { cn } from "@/ui/lib";

export type ProductLikesInfoProps = ComponentProps<ProductInfoItemProps>;

export function ProductLikesInfo({ className, ...props }: ProductLikesInfoProps) {
  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={Heart}
      label="Likes"
    />
  );
}
