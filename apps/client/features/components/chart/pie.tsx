"use client";

import { Pie, PieChart, ResponsiveContainer, ResponsiveContainerProps, PieProps, Cell } from "recharts";

import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type ChartPieProps = ComponentProps<
  Partial<ResponsiveContainerProps>,
  Pick<PieProps, "data" | "dataKey"> & {
    chartProps?: ConstructorParameters<typeof PieChart>[0];
    pieProps?: Partial<Omit<PieProps, "ref" | "data" | "dataKey">>;
  }
>;

export function ChartPie({ data, dataKey, chartProps, pieProps, ...props }: ChartPieProps) {
  return (
    <ResponsiveContainer {...props}>
      <PieChart
        {...chartProps}
        margin={{ top: 0, left: 0, bottom: 0, right: 0, ...chartProps?.margin }}
      >
        <Pie
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
              fill={data.color}
              stroke={"transparent"}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
