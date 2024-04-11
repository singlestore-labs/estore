import { Heart } from "lucide-react";
import { useCallback } from "react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info/item";
import { cn } from "@/ui/lib";

export type ProductInfoLikesProps = ComponentProps<ProductInfoItemProps>;

export function ProductInfoLikes({ className, ...props }: ProductInfoLikesProps) {
  const handleClick = () => {};

  return (
    <ProductInfoItem
      {...props}
      className={cn("", className)}
      icon={Heart}
      label="Likes"
      onClick={handleClick}
    >
      60
    </ProductInfoItem>
  );
}
