"use server";

import { db } from "@repo/db";

import { forwardActionError } from "@/action/error/lib/forward";
import { getDbInfoTables } from "@/db/info/constants";

export async function getDbInfo() {
  try {
    return db.controllers.query<{ tableName: string; value: number }[]>({
      query: `\
      SELECT tableName, COUNT(*) AS value
      FROM (${getDbInfoTables.map((i) => `SELECT '${i}' AS tableName FROM ${i}`).join(" UNION ALL ")})
      GROUP BY tableName
      ORDER BY value DESC, tableName ASC
    `,
    });
  } catch (error) {
    return forwardActionError(error);
  }
}
