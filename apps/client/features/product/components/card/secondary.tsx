import Image from "next/image";
import Link from "next/link";

import { ComponentProps } from "@/types";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductCardSecondaryProps = ComponentProps<"div", Pick<Product, "id" | "image" | "description">>;

export function ProductCardSecondary({
  className,
  id,
  image,
  description,
  ...props
}: ProductCardSecondaryProps) {
  const href = ROUTES.PRODUCT_BY_ID(id);

  return (
    <div
      {...props}
      className={cn("flex items-center gap-4", className)}
    >
      <Card className="relative size-20 shrink-0 overflow-hidden">
        <Image
          className="object-cover"
          src={image}
          alt="Glasses"
          fill
          unoptimized
        />
        <Link
          href={href}
          className="absolute z-[1] h-full w-full"
        />
      </Card>

      <div className="">
        <Link
          href={href}
          className="hover:text-primary inline-block transition-colors"
        >
          <h4 className="line-clamp-2 text-base font-semibold capitalize">{description}</h4>
        </Link>
      </div>
    </div>
  );
}
