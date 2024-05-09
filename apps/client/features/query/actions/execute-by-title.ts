"use server";

import { db } from "@repo/db";

import { forwardActionError } from "@/action/error/lib/forward";
import { queries } from "@/data/queries";
import { parseQueryResult } from "@/query/lib/parse-query-result";

export async function executeQueryByTitle(title: string) {
  try {
    const query = queries.find((i) => i.title === title);
    if (!query) throw new Error("Unknown query");
    const result = await db.controllers.query({ query: query.getQuery() });
    return parseQueryResult(result);
  } catch (error) {
    return forwardActionError(error);
  }
}
