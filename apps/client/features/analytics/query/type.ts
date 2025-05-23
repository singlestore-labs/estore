import { z } from "zod";

import { ANALYTICS_QUERY_SLUGS } from "@/analytics/query/constants/slugs";

export type AnalyticsQuerySlugs = (typeof ANALYTICS_QUERY_SLUGS)[keyof typeof ANALYTICS_QUERY_SLUGS];

export type AnalyticsQuery = {
  slug: AnalyticsQuerySlugs;
  title: string;
  description: string;
  text?: string;
  paramsSchema?: z.AnyZodObject;
};
