"use client";

import { useCallback, useState } from "react";

import { ComponentProps } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Stopwatch } from "@/components/stopwatch";
import { Button } from "@/components/ui/button";
import { useAction } from "@/action/hooks/use-action";
import { sleep } from "@/action/lib/sleep";
import { QueryResultTable, QueryResultTableProps } from "@/query/components/result-table";
import { cn } from "@/ui/lib";

export type QueryContainerProps = ComponentProps<SectionProps>;

export function QueryContainer({ className, ...props }: QueryContainerProps) {
  const [result, setResult] = useState<QueryResultTableProps["data"]>([]);
  const { execute, isPending } = useAction();
  const hasResult = !!result?.length;

  const handleRunClick = useCallback(async () => {
    try {
      await execute(() => sleep(1000));
      setResult([{ name: "User 123", age: 27 }]);
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
          contentProps={{
            className: cn("overflow-hidden bg-transparent text-sm p-0 flex-1", !hasResult && "flex"),
          }}
        >
          {hasResult ? (
            <QueryResultTable
              wrapperProps={{ className: "max-h-full" }}
              data={result}
            />
          ) : (
            <p className="text-muted-foreground m-auto text-center text-xs">Run the query to get the results</p>
          )}
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
