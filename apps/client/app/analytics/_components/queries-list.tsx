import { ComponentProps } from "@/types";
import {
  AnalyticsQueriesList as _AnalyticsQueriesList,
  type AnalyticsQueriesListProps as _AnalyticsQueriesListProps,
} from "@/analytics/query/components/list";
import { ANALYTICS_QUERY_LIST } from "@/analytics/query/constants/list";

export type AnalyticsQueriesListProps = ComponentProps<Omit<_AnalyticsQueriesListProps, "queries">>;

export function AnalyticsQueriesList({ ...props }: AnalyticsQueriesListProps) {
  return (
    <_AnalyticsQueriesList
      {...props}
      queries={ANALYTICS_QUERY_LIST}
    />
  );
}
