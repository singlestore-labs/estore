import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCT_LIKES_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { getProducts } from "@/product/lib/get";
import { getProductByIds } from "@/product/lib/get-by-ids";
import { User } from "@/user/types";

export async function getRecommendedProducts(userId: User["id"], filter: Parameters<typeof getProducts>[0]) {
  const { limit = 5 } = filter;

  const result = await db.controllers.query<Pick<ProductRow, "id">[]>({
    query: `\
      SELECT sku.product_id as id
      FROM ${PRODUCT_SKU_TABLE_NAME} sku
      JOIN ${ORDERS_TABLE_NAME} ON sku.id = orders.product_sku_id WHERE orders.user_id = ${userId}
      UNION
      SELECT product_id FROM ${PRODUCT_LIKES_TABLE_NAME} likes WHERE likes.user_id = ${userId}
    `,
  });

  return getProductByIds(result.map((i) => i.id));
}
