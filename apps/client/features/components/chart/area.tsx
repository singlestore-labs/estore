"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, AreaProps } from "recharts";

import { ComponentProps } from "@/types";
import { ChartTooltip } from "@/components/chart/tooltip";
import { getTheme } from "@/ui/get-theme";

export type ChartAreaProps = ComponentProps<
  {},
  ConstructorParameters<typeof AreaChart>[0] & { areaProps?: Partial<Omit<AreaProps, "ref">> }
>;

const theme = getTheme();

export function ChartArea({ data = [], areaProps }: ChartAreaProps) {
  const keys = data.length ? Object.keys(data[0]).filter((key) => !["date"].includes(key)) : [];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <AreaChart
        data={data}
        className="text-sm"
        margin={{ top: 16, bottom: 0, left: 0, right: 0 }}
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
          />
        ))}

        <Tooltip
          content={ChartTooltip}
          cursor={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
