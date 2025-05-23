import { z } from "zod";

export type AnalyticsQuerySlugs = string;

export type AnalyticsQuery = {
  slug: AnalyticsQuerySlugs;
  title: string;
  description: string;
  text?: string;
  paramsSchema?: z.AnyZodObject;
  paramsDefaultValues?: z.infer<z.AnyZodObject>;
};
