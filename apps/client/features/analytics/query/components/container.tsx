"use client";
import { useCallback, useMemo, useState } from "react";

import { ComponentProps, Defined } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/action/hooks/use-action";
import { executeAnalyticsQueryBySlug } from "@/analytics/query/actions/execute-by-slug";
import {
  AnalyticsQueryResultTable,
  AnalyticsQueryResultTableProps,
} from "@/analytics/query/components/result-table";
import { AnalyticsQueryResultTableRow } from "@/analytics/query/components/result-table-row";
import { AnalyticsQueryStopwatch } from "@/analytics/query/components/stopwatch";
import { formatAnalyticsQueryForUI } from "@/analytics/query/lib/format-for-ui";
import { AnalyticsQuery } from "@/analytics/query/type";
import { cn } from "@/ui/lib";

export type AnalyticsQueryContainerProps = ComponentProps<
  SectionProps,
  Omit<AnalyticsQuery, "getQuery"> & { query: string }
>;

export function AnalyticsQueryContainer({ className, slug, query, ...props }: AnalyticsQueryContainerProps) {
  const [result, setResult] = useState<AnalyticsQueryResultTableProps["data"]>([]);
  const { execute, isPending } = useAction();
  const hasResult = !!result?.length;

  const handleRunClick = useCallback(async () => {
    try {
      setResult(await execute(() => executeAnalyticsQueryBySlug(slug)));
    } catch (error) {
      setResult([]);
    }
  }, [slug, execute]);

  const formattedQuery = useMemo(() => formatAnalyticsQueryForUI(query), [query]);

  const renderRow = useCallback<Defined<AnalyticsQueryResultTableProps["renderRow"]>>(
    (result, rowNode) => (
      <AnalyticsQueryResultTableRow
        querySlug={slug}
        result={result}
      >
        {rowNode}
      </AnalyticsQueryResultTableRow>
    ),
    [slug],
  );

  return (
    <Section
      size="sm"
      {...props}
      className={cn("flex flex-col", className)}
      contentProps={{ className: cn("flex flex-col flex-1 gap-4", props.contentProps?.className) }}
    >
      <div className="grid-auto-fit-[calc(50%-theme(spacing.4))] max-md:grid-auto-fit-[100%] grid flex-1 gap-4">
        <Section
          variant="tertiary"
          size="xs"
          spacing="none"
          title="Query"
          titleProps={{ as: "h3" }}
          contentProps={{ className: "h-80 p-0 overflow-hidden" }}
        >
          <Textarea
            value={formattedQuery}
            className="disabled:bg-accent h-full w-full resize-none font-mono disabled:opacity-100"
            disabled
          />
        </Section>
        <Section
          variant="tertiary"
          size="xs"
          spacing="none"
          title="Result"
          titleProps={{ as: "h3" }}
          contentProps={{ className: cn("h-80 p-0 overflow-hidden", !hasResult && "flex") }}
        >
          {hasResult ? (
            <AnalyticsQueryResultTable
              wrapperProps={{ className: "max-h-full" }}
              data={result}
              renderRow={renderRow}
            />
          ) : (
            <p className="text-muted-foreground m-auto text-center text-xs">Run the query to get the results</p>
          )}
        </Section>
      </div>

      <div className="flex items-center justify-between gap-4">
        <AnalyticsQueryStopwatch isRunning={isPending} />
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
