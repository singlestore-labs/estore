"use client";

import { useCallback, useState } from "react";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Stopwatch } from "@/components/stopwatch";
import { Button } from "@/components/ui/button";
import { useAction } from "@/action/hooks/use-action";
import { sleep } from "@/action/lib/sleep";
import { cn } from "@/ui/lib";

export type QueryContainerProps = ComponentProps<SectionProps>;

export function QueryContainer({ className, ...props }: QueryContainerProps) {
  const [result, setResult] = useState<any | undefined>(undefined);
  const { execute, isPending } = useAction();

  const handleRunClick = useCallback(async () => {
    try {
      setResult(await execute(sleep));
    } catch (error) {
      console.error(error);
    }
  }, [execute]);

  return (
    <Section
      size="sm"
      {...props}
      className={cn("flex flex-col", className)}
      contentProps={{ className: cn("flex flex-col flex-1 gap-4", props.contentProps?.className) }}
    >
      <div className="flex flex-1 flex-wrap gap-4">
        <Section
          variant="tertiary"
          size="xs"
          spacing="none"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Query"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "overflow-auto h-80 bg-zinc-50 text-sm" }}
        >
          MySQL query
        </Section>
        <Section
          variant="tertiary"
          size="xs"
          spacing="none"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Result"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "h-80 overflow-auto bg-transparent text-sm" }}
        >
          Result table
        </Section>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Stopwatch
          resultLabel="Executed in "
          isRunning={isPending}
        />
        <Button
          className="ml-auto"
          disabled={isPending}
          onClick={handleRunClick}
        >
          Run
        </Button>
      </div>
    </Section>
  );
}
