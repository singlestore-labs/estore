import { toCurrency } from "@repo/helpers";

import { ComponentProps } from "@/types";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { TrendDirection } from "@/components/trend-direction";
import { OrderRevenueChart } from "@/order/revenure/components/chart";
import { getOrdersRevenueTrend } from "@/order/revenure/lib/get";

export type OrdersRevenueTrendInfoCardProps = ComponentProps<InfoCardProps>;

export async function OrdersRevenueTrendInfoCard({ ...props }: OrdersRevenueTrendInfoCardProps) {
  const data = await getOrdersRevenueTrend();

  return (
    <InfoCard
      {...props}
      title="Last month revenue"
      value={toCurrency(data.total)}
      headerProps={{
        className: "flex items-start justify-between",
        children: (
          <TrendDirection
            className="flex flex-col items-end"
            value={+data.history[data.history.length - 1].value}
            prevValue={+data.history[data.history.length - 2].value}
            legend="Compared to yesterday"
          />
        ),
      }}
    >
      <OrderRevenueChart
        className="mt-auto"
        data={data.history}
      />
    </InfoCard>
  );
}
