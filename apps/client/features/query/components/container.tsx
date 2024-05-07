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
      {...props}
      className={cn("flex flex-col", className)}
      title="Get the top product"
      description="Finds the top product, based on sales and likes"
      contentProps={{ className: "flex flex-col flex-1 gap-4" }}
    >
      <div className="flex flex-1 flex-wrap gap-4">
        <Section
          variant="tertiary"
          size="xs"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Query"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "flex-1 overflow-auto" }}
        >
          Test
        </Section>
        <Section
          variant="tertiary"
          size="xs"
          className="flex flex-1 flex-col max-md:basis-full"
          title="Result"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "flex-1 overflow-auto bg-transparent" }}
        >
          Test
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
