"use client";

import { withCommas } from "@repo/helpers";

import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { getOrdersTrend } from "@/order/lib/get-trend";
import { cn } from "@/ui/lib";

export type OrderTrendInfoChartProps = ComponentProps<
  "div",
  { data: Awaited<ReturnType<typeof getOrdersTrend>> }
>;

export function OrderTrendInfoChart({ className, data, ...props }: OrderTrendInfoChartProps) {
  return (
    <div
      {...props}
      className={cn("text-primary mt-auto h-20 px-4", className)}
    >
      <ChartBar
        data={data.history}
        dataKey="percent"
        tooltipProps={{ titleKey: "week_start", valueKey: "value", renderValue: (v) => withCommas(+v) }}
      />
    </div>
  );
}
