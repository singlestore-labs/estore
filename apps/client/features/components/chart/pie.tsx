"use client";

import { Pie, PieChart, PieProps, Cell, Tooltip } from "recharts";

import type { ResponsiveContainerProps } from "recharts";

import { ComponentProps } from "@/types";
import { ChartResponsiveContainer } from "@/components/chart/responsive-container";
import { ChartTooltip, ChartTooltipProps } from "@/components/chart/tooltip";
import { cn } from "@/ui/lib";

export type ChartPieData = ({ [K: string]: any } & { color?: string })[];

export type ChartPieProps = ComponentProps<
  Partial<ResponsiveContainerProps>,
  Pick<PieProps, "dataKey"> & {
    data?: ChartPieData;
    colors?: string[];
    chartProps?: ConstructorParameters<typeof PieChart>[0];
    pieProps?: Partial<Omit<PieProps, "ref" | "data" | "dataKey">>;
    tooltipProps?: ChartTooltipProps;
    withTooltip?: boolean;
  }
>;

export function ChartPie({
  data,
  dataKey,
  chartProps,
  pieProps,
  colors = [],
  tooltipProps,
  withTooltip,
  ...props
}: ChartPieProps) {
  return (
    <ChartResponsiveContainer {...props}>
      <PieChart
        {...chartProps}
        margin={{ top: 0, left: 0, bottom: 0, right: 0, ...chartProps?.margin }}
      >
        <Pie
          cx="50%"
          cy="50%"
          startAngle={0}
          endAngle={360}
          paddingAngle={0}
          minAngle={0}
          outerRadius="100%"
          {...pieProps}
          data={data}
          dataKey={dataKey}
          animationDuration={1000}
          className={cn("focus:outline-none", pieProps?.className)}
        >
          {data?.map((data, i) => (
            <Cell
              key={`cell-${i}`}
              fill={data.color || colors[i]}
              stroke={"transparent"}
            />
          ))}
        </Pie>

        {withTooltip && (
          <Tooltip
            {...tooltipProps}
            content={ChartTooltip}
            cursor={false}
          />
        )}
      </PieChart>
    </ChartResponsiveContainer>
  );
}
