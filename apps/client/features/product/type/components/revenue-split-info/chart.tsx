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
    <div className={cn("size-28", className)}>
      <ChartPie
        {...props}
        dataKey="revenue"
        withTooltip
        tooltipProps={{
          titleKey: "label",
          valueKey: "revenue",
          renderTitle: (v) => <span className="inline-block first-letter:uppercase">{v}</span>,
          renderValue: (v) => `$${v}`,
        }}
        pieProps={{ innerRadius: "50%" }}
      />
    </div>
  );
}
