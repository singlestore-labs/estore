"use client";

import { useAtomValue } from "jotai/react";
import { Heart } from "lucide-react";

import { ComponentProps } from "@/types";
import { ProductInfoItem, ProductInfoItemProps } from "@/product/components/info-item";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";
import { userProdcutLikesAtom } from "@/user/product/atoms/likes";

export type ProductLikesInfoProps = ComponentProps<
  ProductInfoItemProps,
  { value: Product["likes"]; productId: Product["id"] }
>;

export function ProductLikesInfo({ className, value, productId, ...props }: ProductLikesInfoProps) {
  const likes = useAtomValue(userProdcutLikesAtom);
  const isLiked = likes.find((i) => i.productId === productId);

  return (
    <ProductInfoItem
      {...props}
      className={cn("", isLiked && "[&_[fill]]:fill-primary [&_[stroke]]:stroke-primary", className)}
      icon={Heart}
      label="Likes"
    >
      {value}
    </ProductInfoItem>
  );
}
