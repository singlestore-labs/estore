"use client";

import { useCallback, useTransition } from "react";

import { ComponentProps, Defined } from "@/types";
import { handleActionError } from "@/action/error/lib/handle";
import { isActionError } from "@/action/error/lib/is";
import { executeAnalyticsQueryBySlug } from "@/analytics/query/actions/execute-by-slug";
import {
  AnalyticsQueriesList as _AnalyticsQueriesList,
  type AnalyticsQueriesListProps as _AnalyticsQueriesListProps,
} from "@/analytics/query/components/list";
import { AnalyticsQueryResultTableProps } from "@/analytics/query/components/result-table";
import { ANALYTICS_QUERY_LIST } from "@/analytics/query/constants/list";

export type AnalyticsQueriesListProps = ComponentProps<
  Omit<_AnalyticsQueriesListProps, "queries" | "onRunQueryClick">
>;

export function AnalyticsQueriesList({ ...props }: AnalyticsQueriesListProps) {
  const [, startTransition] = useTransition();

  const handleQueryRunClick = useCallback<Defined<_AnalyticsQueriesListProps["onRunQueryClick"]>>(
    async (querySlug) => {
      return new Promise<AnalyticsQueryResultTableProps["data"]>((resolve, reject) => {
        startTransition(async () => {
          try {
            const result = await executeAnalyticsQueryBySlug(querySlug);

            if (isActionError(result)) {
              handleActionError(result.error);
              reject(result.error);
            }

            resolve(result as AnalyticsQueryResultTableProps["data"]);
          } catch (error) {
            reject(error);
          }
        });
      });
    },
    [],
  );

  return (
    <_AnalyticsQueriesList
      {...props}
      queries={ANALYTICS_QUERY_LIST}
      onRunQueryClick={handleQueryRunClick}
    />
  );
}
