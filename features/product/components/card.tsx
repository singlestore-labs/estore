import Image from "next/image";
import Link from "next/link";

import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { ProductInfoLikes } from "@/product/components/info/likes";
import { ProductInfoSales } from "@/product/components/info/sales";
import { ProductInfoSizes } from "@/product/components/info/sizes";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductCardProps = ComponentProps<CardProps, Product>;

export function ProductCard({ className, id, description, price, image, ...props }: ProductCardProps) {
  return (
    <Card
      {...props}
      className={cn("w-full max-w-64 overflow-hidden", className)}
    >
      <div className="relative size-64 overflow-hidden border-b">
        <Image
          className="object-cover"
          src={image}
          alt="Glasses"
          fill
        />
        <Link
          href={ROUTES.PRODUCT_BY_ID(id)}
          className="absolute z-[1] h-full w-full"
        />
      </div>

      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-1">
          <Link
            href={ROUTES.PRODUCT_BY_ID(id)}
            className="transition-colors hover:text-primary"
          >
            <h4 className="line-clamp-2 text-base font-semibold capitalize">{description}</h4>
          </Link>

          <p className="text-end text-base font-semibold">${price}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ProductInfoSizes />
          <ProductInfoSales className="ml-auto" />
          <ProductInfoLikes />
        </div>
      </div>
    </Card>
  );
}
