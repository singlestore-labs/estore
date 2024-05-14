import { ComponentProps } from "@/types";
import { ChartBar } from "@/components/chart/bar";
import { InfoCard, InfoCardProps } from "@/components/info-card";
import { getOrdersTotal } from "@/order/total/lib/get";

export type OrdersTotalCardProps = ComponentProps<InfoCardProps>;

export async function OrdersTotalCard({ className, ...props }: OrdersTotalCardProps) {
  const data = await getOrdersTotal();

  return (
    <InfoCard
      {...props}
      title="Total order"
      value={data.total}
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
