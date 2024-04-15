import { Heart } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info/item";
import { cn } from "@/ui/lib";

export type ProductInfoLikesProps = ComponentProps<ProductInfoItemProps>;

export function ProductInfoLikes({ className, ...props }: ProductInfoLikesProps) {
  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={Heart}
      label="Likes"
    />
  );
}
