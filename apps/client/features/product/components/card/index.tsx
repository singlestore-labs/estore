import { toCurrency } from "@repo/helpers";
import Image from "next/image";
import Link from "next/link";

import { ComponentProps, Optional } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { ProductLikesInfo } from "@/product/likes/components/info";
import { ProductSalesInfo } from "@/product/sales/components/info";
import { ProductSizesInfo } from "@/product/size/components/info";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductCardProps = ComponentProps<
  CardProps,
  Optional<Product, "likes" | "sizes" | "sales" | "created_at" | "description" | "gender">
>;

export function ProductCard({
  className,
  id,
  title,
  price,
  image,
  sizes,
  likes,
  sales,
  gender,
  created_at,
  ...props
}: ProductCardProps) {
  return (
    <Card
      {...props}
      className={cn("w-full max-w-64 overflow-hidden", className)}
    >
      <div className="relative h-0 w-full overflow-hidden border-b pt-[100%]">
        <Image
          className="object-cover"
          src={image}
          alt="Glasses"
          fill
          unoptimized
        />
        <Link
          href={ROUTES.PRODUCT_BY_ID(id)}
          className="absolute left-0 top-0 z-[1] h-full w-full"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-1">
          <Link
            href={ROUTES.PRODUCT_BY_ID(id)}
            className="hover:text-primary transition-colors"
          >
            <h4 className="line-clamp-2 text-base font-semibold capitalize">{title}</h4>
          </Link>

          <p className="text-end text-base font-semibold">{toCurrency(price)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {sizes && <ProductSizesInfo sizes={sizes} />}
          {!!sales && (
            <ProductSalesInfo
              className="ml-auto"
              value={sales}
            />
          )}
          {!!likes && (
            <ProductLikesInfo
              productId={id}
              value={likes}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
