import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function countProductSales(id: Product["id"]) {
  try {
    const result = await db.controllers.query<{ sales: number }[]>({
      query: `\
        SELECT COUNT(*) AS sales
        FROM ${ORDERS_TABLE_NAME} orders
        JOIN (
          SELECT id FROM ${PRODUCT_SKU_TABLE_NAME}
          WHERE product_id = ${id}
        ) sku ON sku.id = orders.product_sku_id
      `,
    });

    return result[0].sales;
  } catch (error) {
    console.error(error);
    return 0;
  }
}
