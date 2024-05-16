import { db } from "@repo/db";
import { PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function countProductStock(id: Product["id"]) {
  try {
    const result = await db.controllers.query<{ product_id: Product["id"]; stock: string }[]>({
      query: `\
        SELECT product_id, SUM(stock) AS stock
        FROM ${PRODUCT_SKU_TABLE_NAME}
        WHERE product_id = ${id}
        GROUP BY product_id
      `,
    });

    return result[0].stock;
  } catch (error) {
    console.error(error);
    return "0";
  }
}
