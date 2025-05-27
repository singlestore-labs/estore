"use client";

import { z } from "zod";

import { ComponentProps } from "@/types";
import {
  AnalyticsQueriesList as _AnalyticsQueriesList,
  AnalyticsQueriesListProps as _AnalyticsQueriesListProps,
} from "@/analytics/query/components/list";
import { AnalyticsQuery } from "@/analytics/query/type";

import { apiRequest } from "../../../api";

export type AnalyticsQueriesListProps = ComponentProps<
  Omit<_AnalyticsQueriesListProps, "queries" | "onRunQueryClick">
>;

const QUERY_CONFIGS: Record<string, AnalyticsQuery & { execute: (...args: any[]) => Promise<any> }> = {
  find_products: {
    slug: "find_products",
    title: "Find products",
    description: "Finds product ids based on filters using hybrid search",
    params: {
      schema: z.object({
        query: z.string(),
        color: z.string(),
        min_price: z.number().min(0),
        max_price: z.number().min(0),
        size: z.enum(["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl"]),
        limit: z.number().int().min(0),
      }),
      defaultValues: {
        query: "",
        color: "",
        min_price: "",
        max_price: "",
        size: "",
        limit: 10,
      },
      fields: {
        query: { label: "Search query", placeholder: "e.g. Jeans" },
        color: { label: "Color", placeholder: "e.g. Blue" },
        min_price: { label: "Min price ($)", placeholder: "e.g. 125" },
        max_price: { label: "Max price ($)", placeholder: "e.g. 2500" },
        size: { label: "Size", placeholder: "e.g. xl", optionCase: "upper" },
        limit: { label: "Limit", placeholder: "e.g. 10" },
      },
    },
    execute: async (params) => {
      const urlSearchParams = new URLSearchParams(params);
      const response = await apiRequest(`/products?${urlSearchParams}`);
      const data = await response.json();
      return data;
    },
  },

  top_products: {
    slug: "top_products",
    title: "Top products",
    description: "Retrieves the top product ids based on sales and likes",
    params: {
      schema: z.object({
        limit: z.number().int().min(0),
      }),
      defaultValues: {
        limit: 10,
      },
      fields: {
        limit: { label: "Limit", placeholder: "e.g. 10" },
      },
    },
    execute: async (params) => {
      const urlSearchParams = new URLSearchParams(params);
      const response = await apiRequest(`/products/top?${urlSearchParams}`);
      const data = await response.json();
      return data;
    },
  },

  product_sales: {
    slug: "product_sales",
    title: "Product sales",
    description: "Retrieves the sales history of a product",
    params: {
      schema: z.object({
        id: z.string(),
        interval: z.number().int().min(0),
        interval_unit: z.enum(["DAY", "WEEK", "MONTH"]),
      }),
      defaultValues: {
        id: "1",
        interval: 6,
        interval_unit: "MONTH",
      },
      fields: {
        id: { label: "Product ID", placeholder: "e.g. 123" },
        interval: { label: "Interval", placeholder: "e.g. 6" },
        interval_unit: { label: "Interval Unit", placeholder: "e.g. Month", optionCase: "sentence" },
      },
    },
    execute: async ({ id, ...params }) => {
      const urlSearchParams = new URLSearchParams(params);
      const response = await apiRequest(`/products/${id}/sales?${urlSearchParams}`);
      const data = await response.json();
      return data;
    },
  },
};

const QUERIES = Object.values(QUERY_CONFIGS).map(({ execute, ...query }) => query);

export function AnalyticsQueriesList({ ...props }: AnalyticsQueriesListProps) {
  return (
    <_AnalyticsQueriesList
      {...props}
      queries={QUERIES}
      onRunQueryClick={(slug, params) => QUERY_CONFIGS[slug].execute(params)}
    />
  );
}
