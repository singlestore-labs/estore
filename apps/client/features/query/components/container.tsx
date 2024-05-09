"use client";
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";

import { ComponentProps, Defined } from "@/types";
import { Section, SectionProps } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/action/hooks/use-action";
import { isDbInfoReadyValue } from "@/db/info/atoms/is-ready";
import { executeQueryBySlug } from "@/query/actions/execute-by-slug";
import { QueryResultTable, QueryResultTableProps } from "@/query/components/result-table";
import { QueryResultTableRow } from "@/query/components/result-table-row";
import { QueryStopwatch } from "@/query/components/stopwatch";
import { formatQueryForUI } from "@/query/lib/format-for-ui";
import { Query } from "@/query/type";
import { cn } from "@/ui/lib";

export type QueryContainerProps = ComponentProps<SectionProps, Omit<Query, "getQuery"> & { query: string }>;

export function QueryContainer({ className, slug, query, ...props }: QueryContainerProps) {
  const [result, setResult] = useState<QueryResultTableProps["data"]>([]);
  const { execute, isPending } = useAction();
  const hasResult = !!result?.length;
  const isDbInfoReady = useAtomValue(isDbInfoReadyValue);

  const handleRunClick = useCallback(async () => {
    try {
      setResult(await execute(() => executeQueryBySlug(slug)));
    } catch (error) {
      setResult([]);
    }
  }, [slug, execute]);

  const formattedQuery = useMemo(() => formatQueryForUI(query), [query]);

  const renderRow = useCallback<Defined<QueryResultTableProps["renderRow"]>>(
    (result, rowNode) => (
      <QueryResultTableRow
        querySlug={slug}
        result={result}
      >
        {rowNode}
      </QueryResultTableRow>
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
            <QueryResultTable
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
        <QueryStopwatch isRunning={isPending} />
        <Button
          className="ml-auto"
          disabled={!isDbInfoReady || isPending}
          onClick={handleRunClick}
        >
          Run
        </Button>
      </div>
    </Section>
  );
}
