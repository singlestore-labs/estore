import { ReactNode } from "react";
import { TooltipProps } from "recharts";

import { Card } from "@/components/ui/card";
import { cn } from "@/ui/lib";

export type ChartTooltipProps = TooltipProps<any, any> & {
  titleKey?: string;
  valueKey?: string;
  renderTitle?: (title: string) => ReactNode;
  renderValue?: (value: string) => ReactNode;
};

export function ChartTooltip({
  active,
  payload,
  titleKey = "date",
  valueKey = "value",
  renderTitle,
  renderValue,
}: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const [props] = payload;
  const title = props.payload[titleKey];
  const value = props.payload[valueKey];

  return (
    <Card
      className={cn(
        "bg-card flex flex-col items-center justify-center p-2 text-center text-sm",
        props.className,
      )}
    >
      <p>
        <strong>{renderTitle?.(title) || title}</strong>
        <br />
        {renderValue?.(value) || value}
      </p>
    </Card>
  );
}
