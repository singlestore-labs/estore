import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { ComponentProps, Optional } from "@/types";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export const productCardSecondaryVariants = cva("flex items-center", {
  variants: {
    size: { default: "gap-4", sm: "gap-2" },
  },
  defaultVariants: {
    size: "default",
  },
});

export const productCardSecondaryImageVariants = cva("relative shrink-0 overflow-hidden", {
  variants: {
    size: { default: "size-20", sm: "size-10 rounded-xs" },
  },
  defaultVariants: {
    size: "default",
  },
});

export const productCardSecondaryTitleVariants = cva("line-clamp-2 font-semibold capitalize", {
  variants: {
    size: { default: "text-base", sm: "text-sm" },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ProductCardSecondaryProps = ComponentProps<
  "div",
  Optional<Pick<Product, "id" | "image" | "description">, "image"> &
    VariantProps<typeof productCardSecondaryVariants>
>;

export function ProductCardSecondary({
  className,
  id,
  image,
  description,
  size,
  ...props
}: ProductCardSecondaryProps) {
  const href = ROUTES.PRODUCT_BY_ID(id);

  return (
    <div
      {...props}
      className={cn(productCardSecondaryVariants({ size }), className)}
    >
      {image && (
        <Card className={productCardSecondaryImageVariants({ size })}>
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
      )}

      <Link
        href={href}
        className="hover:text-primary inline-block transition-colors"
      >
        <h4 className={productCardSecondaryTitleVariants({ size })}>{description}</h4>
      </Link>
    </div>
  );
}
