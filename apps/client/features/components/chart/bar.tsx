"use client";

import { useId } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, BarProps, ResponsiveContainerProps } from "recharts";

import { ComponentProps } from "@/types";
import { ChartGradient } from "@/components/chart/gradient";
import { ChartTooltip, ChartTooltipProps } from "@/components/chart/tooltip";

type BarChartProps = ConstructorParameters<typeof BarChart>[0];

export type ChartBarProps = ComponentProps<
  Partial<ResponsiveContainerProps>,
  Pick<BarChartProps, "data"> &
    Pick<BarProps, "dataKey"> & {
      chartProps?: Partial<Omit<BarChartProps, "data">>;
      barProps?: Partial<Omit<BarProps, "ref" | "dataKey">>;
      tooltipProps?: ChartTooltipProps;
      withTooltip?: boolean;
    }
>;

export function ChartBar({
  data = [],
  dataKey,
  chartProps,
  barProps,
  tooltipProps,
  withTooltip = true,
  ...props
}: ChartBarProps) {
  const gradientId = useId();

  return (
    <ResponsiveContainer {...props}>
      <BarChart
        {...chartProps}
        data={data}
        margin={{ top: 0, bottom: 0, left: 0, right: 0, ...chartProps?.margin }}
      >
        <defs>
          <ChartGradient
            id={gradientId}
            dataKey={dataKey}
          />
        </defs>

        <Bar
          animationDuration={1000}
          fill={`url(#${gradientId}${dataKey})`}
          {...barProps}
          dataKey={dataKey}
        />

        {withTooltip && (
          <Tooltip
            {...tooltipProps}
            content={ChartTooltip}
            cursor={false}
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
