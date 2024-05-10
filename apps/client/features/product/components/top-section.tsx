import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ROUTES } from "@/constants/routes";
import { ProductInfoItem } from "@/product/components/info-item";
import { getTopProducts } from "@/product/lib/get-top";
import { ProductSalesChart } from "@/product/sales/components/chart";
import { cn } from "@/ui/lib";

export type ProductTopSectionProps = ComponentProps<SectionProps>;

export async function ProductTopSection({ className, ...props }: ProductTopSectionProps) {
  const products = await getTopProducts();

  return (
    <Section
      {...props}
      className={cn("overflow-hidden", className)}
      title="Top products"
      description="Best selling and most liked products"
      size="sm"
      contentProps={{ className: "p-0 max-h-[35rem] overflow-auto" }}
    >
      <ul className="flex flex-col text-sm">
        {products.map((product) => {
          const href = ROUTES.PRODUCT_BY_ID(product.id);

          return (
            <li
              key={product.id}
              className="flex w-full items-center gap-4 border-b p-4"
            >
              <Card className="relative mr-2 size-20 shrink-0 overflow-hidden">
                <Image
                  className="object-cover"
                  src={product.image}
                  alt="Glasses"
                  fill
                  unoptimized
                />
                <Link
                  href={href}
                  className="absolute z-[1] h-full w-full"
                />
              </Card>

              <div className="max-w-48 flex-1">
                <Link
                  href={href}
                  className="hover:text-primary inline-block transition-colors"
                >
                  <h4 className="line-clamp-2 text-base font-semibold capitalize">{product.description}</h4>
                </Link>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <ProductInfoItem
                  className="h-auto"
                  label="Price"
                >
                  {`$${product.price}`}
                </ProductInfoItem>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <ProductInfoItem
                  className="h-auto"
                  label="Sales"
                  icon={ShoppingCart}
                  iconClassName="size-4 mb-0.5"
                >
                  {product.sales.length}
                </ProductInfoItem>
              </div>

              <div className="flex flex-1 items-center justify-center">
                <ProductInfoItem
                  className="h-auto"
                  label="Likes"
                  icon={Heart}
                  iconClassName="size-4"
                >
                  {product.likes}
                </ProductInfoItem>
              </div>

              {!!product.sales.length && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ProductSalesChart
                        className="h-16 max-w-32 flex-1"
                        sales={product.sales}
                        withTooltip={false}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="text-center text-xs">
                      <p>
                        {product.sales.reduce((acc, i) => acc + i.value, 0)}
                        {` sales for the last ${product.sales.length} days`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
