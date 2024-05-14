import { ComponentProps } from "@/types";
import { ChartArea, ChartAreaProps } from "@/components/chart/area";
import { Card, CardProps } from "@/components/ui/card";
import { Product } from "@/product/types";
import { cn } from "@/ui/lib";

export type ProductSalesChartProps = ComponentProps<
  CardProps,
  {
    sales: Product["sales"];
    areaProps?: ChartAreaProps["areaProps"];
    withTooltip?: ChartAreaProps["withTooltip"];
  }
>;

export function ProductSalesChart({
  className,
  sales,
  areaProps,
  withTooltip,
  ...props
}: ProductSalesChartProps) {
  return (
    <Card
      {...props}
      className={cn("relative h-48 overflow-hidden", className)}
    >
      <ChartArea
        data={sales}
        areaProps={areaProps}
        tooltipProps={{ titleKey: "date", valueKey: "value" }}
        withTooltip={withTooltip}
      />
    </Card>
  );
}
