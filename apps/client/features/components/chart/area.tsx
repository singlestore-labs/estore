"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, AreaProps, ResponsiveContainerProps } from "recharts";

import { ComponentProps } from "@/types";
import { ChartGradient } from "@/components/chart/gradient";
import { ChartTooltip, ChartTooltipProps } from "@/components/chart/tooltip";

type AreaChartProps = ConstructorParameters<typeof AreaChart>[0];

export type ChartAreaProps = ComponentProps<
  Partial<ResponsiveContainerProps>,
  Pick<AreaChartProps, "data"> &
    Pick<AreaProps, "dataKey"> & {
      chartProps?: Partial<Omit<AreaChartProps, "data">>;
      areaProps?: Partial<Omit<AreaProps, "ref" | "dataKey">>;
      tooltipProps?: ChartTooltipProps;
      withTooltip?: boolean;
    }
>;

export function ChartArea({
  data = [],
  dataKey,
  chartProps,
  areaProps,
  tooltipProps,
  withTooltip = true,
  ...props
}: ChartAreaProps) {
  const gradientId = useId();

  return (
    <ResponsiveContainer {...props}>
      <AreaChart
        {...chartProps}
        data={data}
        margin={{ top: 8, bottom: 0, left: 0, right: 0, ...chartProps?.margin }}
      >
        <defs>
          <ChartGradient
            id={gradientId}
            dataKey={dataKey}
          />
        </defs>

        <Area
          {...areaProps}
          type="monotone"
          dataKey={dataKey}
          fillOpacity={1}
          stroke="currentColor"
          fill={`url(#${gradientId}${dataKey})`}
          animationDuration={1000}
        />

        {withTooltip && (
          <Tooltip
            {...tooltipProps}
            content={ChartTooltip}
            cursor={false}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
