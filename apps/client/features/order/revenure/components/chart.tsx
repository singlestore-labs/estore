"use client";

import { ComponentProps } from "@/types";
import { ChartArea } from "@/components/chart/area";
import { getOrdersRevenue } from "@/order/revenure/lib/get";
import { cn } from "@/ui/lib";

export type OrderRevenueChartProps = ComponentProps<
  "div",
  { data: Awaited<ReturnType<typeof getOrdersRevenue>>["history"] }
>;

export function OrderRevenueChart({ className, data, ...props }: OrderRevenueChartProps) {
  return (
    <div
      {...props}
      className={cn("text-primary h-20", className)}
    >
      <ChartArea
        data={data}
        dataKey="percent"
        tooltipProps={{
          titleKey: "order_date",
          valueKey: "value",
          renderValue: (value) => `$${parseInt(value)}`,
        }}
      />
    </div>
  );
}
