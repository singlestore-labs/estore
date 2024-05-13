import humanNumber from "human-number";
import { Heart, Receipt, ShoppingCart } from "lucide-react";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductCardSecondary } from "@/product/components/card/secondary";
import { ProductInfoItem } from "@/product/components/info-item";
import { countProductSales } from "@/product/lib/count-sales";
import { getTopProducts } from "@/product/lib/get-top";
import { ProductSalesChart } from "@/product/sales/components/chart";
import { cn } from "@/ui/lib";

export type ProductTopSectionProps = ComponentProps<SectionProps>;

export async function ProductTopSection({ className, ...props }: ProductTopSectionProps) {
  const products = await getTopProducts();
  const productSales = await Promise.all(products.map(({ id }) => countProductSales(id)));

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
        {products.map((product, i) => {
          const totalSales = product.price * productSales[i];

          return (
            <li
              key={product.id}
              className="flex flex-wrap items-center gap-4 border-b p-4"
            >
              <ProductCardSecondary
                id={product.id}
                description={product.description}
                image={product.image}
                className="shrink-0 flex-grow basis-64"
              />

              <div className="flex shrink-[2] flex-grow basis-[24rem] gap-4">
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
                    label="Likes"
                    icon={Heart}
                    iconClassName="size-4"
                  >
                    {product.likes}
                  </ProductInfoItem>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="Sales"
                    icon={ShoppingCart}
                    iconClassName="size-4 mb-0.5"
                  >
                    {productSales[i]}
                  </ProductInfoItem>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="Total sales"
                    icon={Receipt}
                    iconClassName="size-4 mb-0.5"
                  >
                    {humanNumber(totalSales, (v) => v.toFixed(2))}
                  </ProductInfoItem>
                </div>
              </div>

              {!!product.sales.length && (
                <TooltipProvider delayDuration={400}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ProductSalesChart
                        className="h-20 shrink flex-grow basis-40"
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
