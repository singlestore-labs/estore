import { TooltipProps } from "recharts";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/ui/lib";

export function ChartTooltip({ active, payload }: TooltipProps<any, any>) {
  if (!active || !payload || !payload.length) return null;
  const [props] = payload;

  return (
    <Card className={cn("flex flex-col items-center justify-center p-2 text-center text-sm", props.className)}>
      <p>
        <strong>{props.payload.date}</strong>
        <br />
        {props.value}
      </p>
    </Card>
  );
}
