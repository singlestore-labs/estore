"use server";

import { db } from "@repo/db";

import { forwardActionError } from "@/action/error/lib/forward";
import { queries } from "@/data/queries";

export async function executeQueryByTitle(title: string) {
  try {
    const query = queries.find((i) => i.title === title);
    return (await db.controllers.query({ query: query!.getQuery() }))[1];
  } catch (error) {
    return forwardActionError(error);
  }
}
