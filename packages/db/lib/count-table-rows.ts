import { db } from "@repo/db/index";

export async function countTableRows(tableName: string) {
  try {
    const result = await db.controllers.query<Record<string, number>[]>({
      query: `SELECT COUNT(*) FROM ${tableName}`,
    });

    return Object.values(result[0])[0];
  } catch (error) {
    return 0;
  }
}
