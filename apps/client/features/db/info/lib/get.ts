import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  USERS_TABLE_NAME,
} from "@repo/db/constants";

const tables = [
  PRODUCTS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  ORDERS_TABLE_NAME,
  USERS_TABLE_NAME,
] as const;

export function getDbInfo() {
  return db.controllers.query<{ tableName: string; value: number }[]>({
    query: `\
      SELECT tableName, COUNT(*) AS value
      FROM (${tables.map((i) => `SELECT '${i}' AS tableName FROM ${i}`).join(" UNION ALL ")}) AS all_tables
      GROUP BY tableName
      ORDER BY value DESC
    `,
  });
}
