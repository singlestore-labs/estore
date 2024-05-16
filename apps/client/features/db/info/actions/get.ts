"use server";

import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  USERS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
} from "@repo/db/constants";

import { forwardActionError } from "@/action/error/lib/forward";

const tables = [
  ORDERS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  USERS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
] as const;

export async function getDbInfo() {
  try {
    return db.controllers.query<{ tableName: string; value: number }[]>({
      query: `\
      SELECT tableName, COUNT(*) AS value
      FROM (${tables.map((i) => `SELECT '${i}' AS tableName FROM ${i}`).join(" UNION ALL ")})
      GROUP BY tableName
      ORDER BY value DESC, tableName ASC
    `,
    });
  } catch (error) {
    return forwardActionError(error);
  }
}
