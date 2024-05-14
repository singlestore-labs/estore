import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { TrendDirection } from "@/components/trend-direction";
import { getOrdersTotal } from "@/order/total/lib/get";

export type OrdersTotalCardProps = ComponentProps<InfoCardProps>;

export async function OrdersTotalCard({ className, ...props }: OrdersTotalCardProps) {
  const data = await getOrdersTotal();

  return (
    <InfoCard
      {...props}
      title="Total orders"
      value={data.total}
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
      <div className="text-primary h-20 px-4">
        <ChartBar
          data={data.history}
          dataKey="percent"
          tooltipProps={{ titleKey: "week_start", valueKey: "value" }}
        />
      </div>
    </InfoCard>
  );
}
