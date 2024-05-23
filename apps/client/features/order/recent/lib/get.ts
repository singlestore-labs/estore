import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { OrderRecent } from "@/order/types";

export async function getOrdersRecent(filter: { daysInterval?: number; limit?: number } = {}) {
  const { daysInterval = 30, limit = 10 } = filter;
  try {
    const result = await db.controllers.query<OrderRecent[]>({
      query: `\
        SELECT
          orders.*,
          products.id AS product_id,
          products.description AS product_description,
          products.image AS product_image,
          products.price AS product_price
        FROM ${ORDERS_TABLE_NAME} orders
        JOIN (SELECT id, product_id FROM ${PRODUCT_SKU_TABLE_NAME}) AS sku ON sku.id = orders.product_sku_id
        JOIN (SELECT id, description, image, price FROM ${PRODUCTS_TABLE_NAME}) AS products ON products.id = sku.product_id
        WHERE orders.created_at >= (SELECT CURDATE() - INTERVAL ${daysInterval} DAY)
        ORDER BY orders.created_at DESC, products.description ASC
        LIMIT ${limit}
      `,
    });

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
