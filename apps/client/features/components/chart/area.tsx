"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, AreaProps, ResponsiveContainerProps } from "recharts";

import { ComponentProps } from "@/types";
import { ChartTooltip, ChartTooltipProps } from "@/components/chart/tooltip";
import { getTheme } from "@/ui/get-theme";

type AreaChartProps = ConstructorParameters<typeof AreaChart>[0];

export type ChartAreaProps = ComponentProps<
  Partial<ResponsiveContainerProps>,
  Pick<AreaChartProps, "data"> & {
    chartProps?: Partial<Omit<AreaChartProps, "data">>;
    areaProps?: Partial<Omit<AreaProps, "ref">>;
    tooltipProps?: ChartTooltipProps;
    withTooltip?: boolean;
  }
>;

const theme = getTheme();

export function ChartArea({
  data = [],
  chartProps,
  areaProps,
  tooltipProps,
  withTooltip = true,
  ...props
}: ChartAreaProps) {
  const keys = data.length ? Object.keys(data[0]).filter((key) => !["date"].includes(key)) : [];

  return (
    <ResponsiveContainer {...props}>
      <AreaChart
        {...chartProps}
        data={data}
        margin={{ top: 8, bottom: 0, left: 0, right: 0, ...chartProps?.margin }}
      >
        <defs>
          {keys.map((key, i) => (
            <linearGradient
              key={key}
              id={`chartAreaColor${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={theme.colors.primary.DEFAULT}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={theme.colors.primary.DEFAULT}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        {keys.map((key, i) => (
          <Area
            {...areaProps}
            key={key}
            type="monotone"
            dataKey={key}
            fillOpacity={1}
            stroke={theme.colors.primary.DEFAULT}
            fill={`url(#chartAreaColor${i})`}
            animationDuration={1000}
          />
        ))}

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
