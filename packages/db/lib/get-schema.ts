import { DB_NAME } from "@repo/db/constants";
import { db } from "@repo/db/index";

export async function getDatabaseSchema() {
  const result = await db.controllers.query({
    query: `
      SELECT
        TABLE_NAME,
        COLUMN_NAME,
        DATA_TYPE
      FROM information_schema.columns
      WHERE TABLE_SCHEMA = '${DB_NAME}';
    `,
  });

  return result.reduce((acc, { TABLE_NAME, ...rest }) => {
    if (!acc[TABLE_NAME]) acc[TABLE_NAME] = [];
    acc[TABLE_NAME].push(rest);
    return acc;
  }, {});
}
