import { TooltipProps } from "recharts";

import { Card } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export type ChartTooltipProps = TooltipProps<any, any> & {
  titleKey?: string;
  valueKey?: string;
};

export function ChartTooltip({ active, payload, titleKey = "date", valueKey = "value" }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const [props] = payload;

  return (
    <Card
      className={cn(
        "bg-card flex flex-col items-center justify-center p-2 text-center text-sm",
        props.className,
      )}
    >
      <p>
        <strong>{props.payload[titleKey]}</strong>
        <br />
        {props.payload[valueKey]}
      </p>
    </Card>
  );
}
