import { ComponentProps } from "@/types";
import { ChartArea } from "@/components/chart/area";
import { Card, CardProps } from "@/components/ui/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductSalesChartProps = ComponentProps<CardProps, { sales: Product["sales"] }>;

export function ProductSalesChart({ className, sales, ...props }: ProductSalesChartProps) {
  return (
    <Card
      {...props}
      className={cn("relative h-48", className)}
    >
      <ChartArea data={sales} />
    </Card>
  );
}
