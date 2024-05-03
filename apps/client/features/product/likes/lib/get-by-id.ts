import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function getProductLikesById(id: Product["id"]): Promise<Product["likes"]> {
  const rows = await db.controllers.query<Record<string, number>[]>({
    query: `SELECT COUNT(*) FROM ${PRODUCT_LIKES_TABLE_NAME} WHERE product_id = ${id}`,
  });

  return Object.values(rows[0])[0];
}
