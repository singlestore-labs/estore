"use client";

import { ComponentProps } from "@/types";
import { ChartPie, ChartPieProps } from "@/components/chart/pie";
import { cn } from "@/ui/lib";

export type ProductTypeRevenueSplitInfoChartProps = ComponentProps<Omit<ChartPieProps, "dataKey">>;

export function ProductTypeRevenueSplitInfoChart({
  className,
  ...props
}: ProductTypeRevenueSplitInfoChartProps) {
  return (
    <div className={cn("mx-4 mb-4 size-24", className)}>
      <ChartPie
        {...props}
        dataKey="revenue"
        withTooltip
        tooltipProps={{ titleKey: "label", valueKey: "revenue", renderValue: (v) => `$${v}` }}
        pieProps={{ innerRadius: "50%" }}
      />
    </div>
  );
}
