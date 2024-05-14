import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { Card, CardProps } from "@/components/ui/card";
import { getOrdersTotal } from "@/order/total/lib/get";
import { cn } from "@/ui/lib";

export type OrdersTotalCardProps = ComponentProps<CardProps>;

export async function OrdersTotalCard({ className, ...props }: OrdersTotalCardProps) {
  const data = await getOrdersTotal();

  return (
    <Card
      {...props}
      className={cn("flex flex-col gap-4 p-4", className)}
    >
      <div>
        <h2 className="font-medium">Total orders</h2>
        <p className="text-xl font-medium">{data.total}</p>
      </div>

      <div className="text-primary h-20">
        <ChartBar
          data={data.history}
          dataKey="value"
          tooltipProps={{ titleKey: "week_start", valueKey: "value" }}
        />
      </div>
    </Card>
  );
}
