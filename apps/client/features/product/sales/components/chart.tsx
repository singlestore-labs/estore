import { ComponentProps } from "@/types";
import { ChartArea, ChartAreaProps } from "@/components/chart/area";
import { Card, CardProps } from "@/components/ui/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductSalesChartProps = ComponentProps<
  CardProps,
  { sales: Product["sales"]; areaProps?: ChartAreaProps["areaProps"] }
>;

export function ProductSalesChart({ className, sales, areaProps, ...props }: ProductSalesChartProps) {
  return (
    <Card
      {...props}
      className={cn("relative h-48", className)}
    >
      <ChartArea
        data={sales}
        areaProps={areaProps}
      />
    </Card>
  );
}
