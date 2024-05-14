import { ComponentProps } from "@/types";
import { Card, CardProps } from "@/components/ui/card";
import { OrderRevenueChart } from "@/order/revenure/components/chart";
import { getOrdersRevenue } from "@/order/revenure/lib/get";
import { cn } from "@/ui/lib";

export type OrdersRevenueCardProps = ComponentProps<CardProps>;

export async function OrdersRevenueCard({ className, ...props }: OrdersRevenueCardProps) {
  const data = await getOrdersRevenue();

  return (
    <Card
      {...props}
      className={cn("flex flex-col gap-4 overflow-hidden", className)}
    >
      <div className="px-4 pt-4">
        <h2 className="font-medium">Total revenue</h2>
        <p className="text-xl font-medium">${data.total}</p>
      </div>

      <OrderRevenueChart data={data.history} />
    </Card>
  );
}
