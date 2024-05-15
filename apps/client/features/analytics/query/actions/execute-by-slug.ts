"use server";

import { db } from "@repo/db";

import { forwardActionError } from "@/action/error/lib/forward";
import { ANALYTICS_QUERY_LIST } from "@/analytics/query/constants/list";
import { parseQueryResult } from "@/query/lib/parse-query-result";

export async function executeAnalyticsQueryBySlug(slug: string) {
  try {
    const query = ANALYTICS_QUERY_LIST.find((i) => i.slug === slug);
    if (!query) throw new Error("Unknown query");
    const result = await db.controllers.query({ query: query.getQuery() });
    return parseQueryResult(result);
  } catch (error) {
    return forwardActionError(error);
  }
}
