import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { Card, CardProps } from "@/components/ui/card";
import { getTotalOrders } from "@/order/lib/get-total";
import { cn } from "@/ui/lib";

export type OrdersTotalCardProps = ComponentProps<CardProps>;

export async function OrdersTotalCard({ className, ...props }: OrdersTotalCardProps) {
  const orders = await getTotalOrders();

  return (
    <Card
      {...props}
      className={cn("flex flex-col gap-4 p-4", className)}
    >
      <div>
        <h2 className="font-medium">Total orders</h2>
        <p className="text-xl font-medium">{orders.total}</p>
      </div>

      <div className="text-primary -mx-2 h-20">
        <ChartBar
          data={orders.history}
          dataKey="value"
          tooltipProps={{ titleKey: "week_range", valueKey: "value" }}
        />
      </div>
    </Card>
  );
}
