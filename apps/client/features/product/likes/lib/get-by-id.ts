import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function getProductLikesById(id: Product["id"]): Promise<Product["likes"]> {
  try {
    const existedRows = await db.controllers.query<Record<string, number>[]>({
      query: `SELECT COUNT(*) FROM ${PRODUCT_LIKES_TABLE_NAME} WHERE productId = ${id}`,
    });

    return Object.values(existedRows[0])[0];
  } catch (error) {
    return 0;
  }
}
