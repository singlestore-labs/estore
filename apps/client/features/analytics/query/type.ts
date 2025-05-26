import { ReactNode } from "react";
import { z } from "zod";

export type AnalyticsQuerySlugs = string;

export type AnalyticsQuery = {
  slug: AnalyticsQuerySlugs;
  title: string;
  description: string;
  text?: string;
  params?: {
    schema: z.AnyZodObject;
    defaultValues: z.infer<z.AnyZodObject>;
    fields: Record<
      string,
      {
        label: ReactNode;
        placeholder: string;
      }
    >;
  };
};
