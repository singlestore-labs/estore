import { Info } from "lucide-react";

import { ComponentProps } from "@/types";
import { Stopwatch, StopwatchProps } from "@/components/stopwatch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/ui/lib";

export type AnalyticsQueryStopwatchProps = ComponentProps<"div", Pick<StopwatchProps, "isRunning">>;

export function AnalyticsQueryStopwatch({ className, isRunning, ...props }: AnalyticsQueryStopwatchProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger
            asChild
            onFocus={(e) => {
              e.preventDefault();
            }}
          >
            {!isRunning && <Info className="text-muted-foreground h-4 w-4" />}
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            The measurement is client-side and includes the rendering time of the component.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Stopwatch
        resultLabel="Executed in "
        isRunning={isRunning}
      />
    </div>
  );
}
