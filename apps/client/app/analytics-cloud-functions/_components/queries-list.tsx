"use client";

import { useCallback } from "react";

import { ComponentProps, Defined } from "@/types";
import {
  AnalyticsQueriesList as _AnalyticsQueriesList,
  type AnalyticsQueriesListProps as _AnalyticsQueriesListProps,
} from "@/analytics/query/components/list";
import { AnalyticsQueryResultTableProps } from "@/analytics/query/components/result-table";
import { AnalyticsQuery } from "@/analytics/query/type";

export type AnalyticsQueriesListProps = ComponentProps<Omit<_AnalyticsQueriesListProps, "queries">>;

const QUERIES = [
  {
    slug: "find_products",
    title: "Find products",
    description: "Finds product ids based on filters using hybrid search",
  },
  {
    slug: "top_products",
    title: "Top products",
    description: "Retrieves the top product ids based on sales and likes",
  },
  {
    slug: "product_sales",
    title: "Product sales",
    description: "Retrieves the sales history of a product",
  },
] satisfies AnalyticsQuery[];

const QUERY_REQUESTS = {
  find_products: async () => {
    console.log("find_products");
    return [];
  },

  top_products: async () => {
    return [];
  },

  product_sales: async () => {
    return [];
  },
} satisfies {
  [K in (typeof QUERIES)[number]["slug"]]: (...args: any) => Promise<AnalyticsQueryResultTableProps["data"]>;
};

export function AnalyticsQueriesList({ ...props }: AnalyticsQueriesListProps) {
  const handleRunQueryClick = useCallback<Defined<AnalyticsQueriesListProps["onRunQueryClick"]>>(
    (querySlug) => QUERY_REQUESTS[querySlug](),
    [],
  );

  return (
    <_AnalyticsQueriesList
      {...props}
      queries={QUERIES}
      onRunQueryClick={handleRunQueryClick}
    />
  );
}
