import Image from "next/image";
import Link from "next/link";

import { ComponentProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardProps } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { ProductInfoContainer } from "@/product/components/info/container";
import { cn } from "@/ui/lib";

export type ProductCardProps = ComponentProps<CardProps>;

const image = "https://cdn-images.farfetch-contents.com/14/11/79/76/14117976_18684183_300.jpg";

export function ProductCard({ className, ...props }: ProductCardProps) {
  const id = "1";
  const title = "Air Vapormax 2019 CPFM sneakers";
  const price = 992;

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
            <h4 className="line-clamp-2 text-base font-semibold capitalize">{title}</h4>
          </Link>

          <p className="text-end text-base font-semibold">${price}</p>
        </div>

        <ProductInfoContainer />
      </div>
    </Card>
  );
}
