import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
  PRODUCT_TYPES_TABLE_NAME,
} from "@repo/db/constants";
import { ProductTypeRow } from "@repo/db/types";

export async function getProductTypeRevenueSplit() {
  try {
    const result = await db.controllers.query<
      (ProductTypeRow & { products_count: number; orders_count: number; revenue: string })[]
    >({
      query: `\
        SELECT
          types.id AS id,
          types.label AS label,
          COUNT(DISTINCT products.id) AS products_count,
          COUNT(orders.id) AS orders_count,
          SUM(products.price) AS revenue
        FROM ${PRODUCT_TYPES_TABLE_NAME} types
        JOIN (SELECT id, type_id, price FROM ${PRODUCTS_TABLE_NAME}) AS products ON products.type_id = types.id
        JOIN (SELECT id, product_id FROM ${PRODUCT_SKU_TABLE_NAME}) AS sku ON sku.product_id = products.id
        JOIN (SELECT id, product_sku_id FROM ${ORDERS_TABLE_NAME}) AS orders ON orders.product_sku_id = sku.id
        GROUP BY types.id, types.label
        ORDER BY revenue DESC
        LIMIT 10
      `,
    });

    return result.map((i) => ({ ...i, revenue: +i.revenue }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
