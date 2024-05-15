import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { TrendDirection } from "@/components/trend-direction";
import { getOrdersTrend } from "@/order/lib/get-trend";

export type OrdersTrendInfoCardProps = ComponentProps<InfoCardProps>;

export async function OrdersTrendInfoCard({ className, ...props }: OrdersTrendInfoCardProps) {
  const data = await getOrdersTrend();

  return (
    <InfoCard
      {...props}
      title="Sales"
      value={data.total}
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
