import { ComponentProps } from "@/types";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { OrderRevenueChart } from "@/order/revenure/components/chart";
import { getOrdersRevenue } from "@/order/revenure/lib/get";

export type OrdersRevenueCardProps = ComponentProps<InfoCardProps>;

export async function OrdersRevenueCard({ className, ...props }: OrdersRevenueCardProps) {
  const data = await getOrdersRevenue();

  return (
    <InfoCard
      {...props}
      title="Total revenue"
      value={`$${data.total}`}
    >
      <OrderRevenueChart data={data.history} />
    </InfoCard>
  );
}
