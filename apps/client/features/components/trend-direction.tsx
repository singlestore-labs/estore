import { TrendingDown, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

import { ComponentProps } from "@/types";
import { cn } from "@/ui/lib";

export type TrendDirectionProps = ComponentProps<
  "p",
  { prevValue?: number; value: number; legend?: ReactNode }
>;

export function TrendDirection({ className, prevValue = 0, value, legend, ...props }: TrendDirectionProps) {
  const isUp = value > prevValue;
  const percentageDiff = Math.abs(100 - 100 / (prevValue / value));
  const Icon = isUp ? TrendingUp : TrendingDown;

  return (
    <p
      {...props}
      className={cn("", className)}
    >
      <span className={cn("flex items-center gap-1 text-sm", isUp ? "text-primary" : "text-destructive")}>
        <span className="font-medium">{percentageDiff ? `${percentageDiff.toFixed(1)}%` : null}</span>
        <Icon className="h-[1.25em] w-[1.25em]" />
      </span>
      {legend}
    </p>
  );
}
