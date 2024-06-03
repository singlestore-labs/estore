import { db } from "@repo/db";
import { PRODUCT_TYPES_TABLE_NAME } from "@repo/db/constants";

export async function countProductTypes() {
  try {
    const result = await db.controllers.query<Record<string, number>[]>({
      query: `\
        SELECT COUNT(*) AS count
        FROM ${PRODUCT_TYPES_TABLE_NAME} product_types
      `,
    });

    return Object.values(result[0])[0];
  } catch (error) {
    return 0;
  }
}
