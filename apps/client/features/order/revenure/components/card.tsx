import { ComponentProps } from "@/types";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { TrendDirection } from "@/components/trend-direction";
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
      headerProps={{
        className: "flex items-start justify-between",
        children: (
          <TrendDirection
            className="flex flex-col items-end"
            value={+data.history[data.history.length - 1].value}
            prevValue={+data.history[data.history.length - 2].value}
          />
        ),
      }}
    >
      <OrderRevenueChart data={data.history} />
    </InfoCard>
  );
}
