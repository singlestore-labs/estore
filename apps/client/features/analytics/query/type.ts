import { ANALYTICS_QUERY_SLUGS } from "@/analytics/query/constants/slugs";

export type AnalyticsQuerySlugs = (typeof ANALYTICS_QUERY_SLUGS)[keyof typeof ANALYTICS_QUERY_SLUGS];

export type AnalyticsQuery<T extends (...args: any[]) => string = (...args: any[]) => string> = {
  slug: AnalyticsQuerySlugs;
  title: string;
  description: string;
  getQuery: T;
};
