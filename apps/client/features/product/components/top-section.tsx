import { toCurrency, withCommas } from "@repo/helpers";
import humanNumber from "human-number";
import { Heart, Layers, Receipt, ShoppingCart } from "lucide-react";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductCardSecondary } from "@/product/components/card/secondary";
import { ProductInfoItem } from "@/product/components/info-item";
import { countProductSales } from "@/product/lib/count-sales";
import { countProductStock } from "@/product/lib/count-stock";
import { getTopProducts } from "@/product/lib/get-top";
import { ProductSalesChart } from "@/product/sales/components/chart";
import { cn } from "@/ui/lib";

export type ProductTopSectionProps = ComponentProps<SectionProps>;

async function getData() {
  const products = await getTopProducts({ limit: 10 });
  const productSales = await Promise.all(
    products.map(({ id }) => Promise.all([countProductSales(id), countProductStock(id)])),
  );

  return { products, productSales };
}

export async function ProductTopSection({ className, contentProps, ...props }: ProductTopSectionProps) {
  const { products, productSales } = await getData();

  return (
    <Section
      {...props}
      className={cn("overflow-hidden", className)}
      title="Top products"
      description="Best selling and most liked products"
      size="sm"
      contentProps={{
        ...contentProps,
        className: cn("p-0 overflow-auto", contentProps?.className),
      }}
    >
      <ul className="flex flex-col text-sm">
        {products.map((product, i) => {
          const totalSales = product.price * productSales[i][0];

          return (
            <li
              key={product.id}
              className="flex flex-wrap items-center gap-4 border-b p-4"
            >
              <ProductCardSecondary
                id={product.id}
                title={product.title}
                image={product.image}
                className="flex-grow basis-64"
              />

              <div className="flex-grow-full flex basis-80 gap-4">
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="Price"
                  >
                    {toCurrency(product.price)}
                  </ProductInfoItem>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="In stock"
                    icon={Layers}
                    iconClassName="size-4 mb-0.5"
                  >
                    {withCommas(+productSales[i][1])}
                  </ProductInfoItem>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="Likes"
                    icon={Heart}
                    iconClassName="size-4"
                  >
                    {withCommas(product.likes)}
                  </ProductInfoItem>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <ProductInfoItem
                    className="h-auto"
                    label="Sales"
                    icon={ShoppingCart}
                    iconClassName="size-4 mb-0.5"
                  >
                    {withCommas(productSales[i][0])}
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
                        className="h-20 flex-grow basis-40"
                        sales={product.sales}
                        withTooltip={false}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="text-center text-xs">
                      <p>
                        {withCommas(product.sales.reduce((acc, i) => acc + i.value, 0))}
                        {` sales in the last month.`}
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
