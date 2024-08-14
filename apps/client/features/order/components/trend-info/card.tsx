import { withCommas } from "@repo/helpers";

import { ComponentProps } from "@/types";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { TrendDirection } from "@/components/trend-direction";
import { OrderTrendInfoChart } from "@/order/components/trend-info/chart";
import { getOrdersTrend } from "@/order/lib/get-trend";

export type OrdersTrendInfoCardProps = ComponentProps<InfoCardProps>;

export async function OrdersTrendInfoCard({ ...props }: OrdersTrendInfoCardProps) {
  const data = await getOrdersTrend();

  return (
    <InfoCard
      {...props}
      title="Last 3 months sales"
      value={withCommas(data.total)}
      headerProps={{
        className: "flex items-start justify-between",
        children: (
          <TrendDirection
            className="flex flex-col items-end"
            value={+data.history[data.history.length - 1].value}
            prevValue={+data.history[data.history.length - 2].value}
            legend="Compared to last week"
          />
        ),
      }}
    >
      <OrderTrendInfoChart data={data} />
    </InfoCard>
  );
}
