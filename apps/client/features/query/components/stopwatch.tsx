import { Info } from "lucide-react";

import { ComponentProps } from "@/types";
import { Stopwatch, StopwatchProps } from "@/components/stopwatch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/ui/lib";

export type QueryStopwatchProps = ComponentProps<"div", Pick<StopwatchProps, "isRunning">>;

export function QueryStopwatch({ className, isRunning, ...props }: QueryStopwatchProps) {
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
            Measurement takes place on the client side and covers the component rendering time.
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
