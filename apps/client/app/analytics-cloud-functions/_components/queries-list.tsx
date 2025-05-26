"use client";

import { z } from "zod";

import { ComponentProps } from "@/types";
import {
  AnalyticsQueriesList as _AnalyticsQueriesList,
  type AnalyticsQueriesListProps as _AnalyticsQueriesListProps,
} from "@/analytics/query/components/list";
import { AnalyticsQuery } from "@/analytics/query/type";

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
        minPrice: z.number().min(0),
        maxPrice: z.number().min(0),
        size: z.enum(["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl", "oneSize"]),
        limit: z.number().int().min(0),
      }),
      defaultValues: {
        query: "",
        color: "",
        minPrice: "",
        maxPrice: "",
        size: "",
        limit: 10,
      },
      fields: {
        query: {
          label: "Search query",
          placeholder: "e.g. Jeans",
        },
        color: {
          label: "Color",
          placeholder: "e.g. Blue",
        },
        minPrice: {
          label: "Min price ($)",
          placeholder: "e.g. 125",
        },
        maxPrice: {
          label: "Max price ($)",
          placeholder: "e.g. 2500",
        },
        size: {
          label: "Size",
          placeholder: "e.g. xl",
        },
        limit: {
          label: "Limit",
          placeholder: "e.g. 10",
        },
      },
    },
    execute: async (params) => {
      console.log(params);
    },
  },

  top_products: {
    slug: "top_products",
    title: "Top products",
    description: "Retrieves the top product ids based on sales and likes",
    execute: async () => {},
  },

  product_sales: {
    slug: "product_sales",
    title: "Product sales",
    description: "Retrieves the sales history of a product",
    execute: async () => {},
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
