import { DataKey } from "recharts/types/util/types";

import { ComponentProps } from "@/types";

export type ChartGradientProps = ComponentProps<{ id: string; dataKey: DataKey<any> }>;

export function ChartGradient({ id, dataKey }: ChartGradientProps) {
  return (
    <linearGradient
      id={id + dataKey}
      x1="0"
      y1="0"
      x2="0"
      y2="1"
    >
      <stop
        offset="5%"
        stopColor="currentColor"
        stopOpacity={0.8}
      />
      <stop
        offset="95%"
        stopColor="currentColor"
        stopOpacity={0}
      />
    </linearGradient>
  );
}
