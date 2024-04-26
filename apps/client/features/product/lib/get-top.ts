import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME, PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";

import { getProductByIds } from "@/product/lib/get-by-ids";
import { Product } from "@/product/types";

export async function getTopProduct(): Promise<Product | undefined> {
  const { id } = (
    await db.controllers.query<{ id: Product["id"]; score: number }[]>({
      query: `\
        SELECT
          p.id,
          (COALESCE(o.orders, 0) + COALESCE(l.likes, 0)) AS score
        FROM ${PRODUCTS_TABLE_NAME} p
        LEFT JOIN (
          SELECT productId, COUNT(*) AS orders
          FROM ${ORDERS_TABLE_NAME}
          GROUP BY productId
        ) o ON p.id = o.productId
        LEFT JOIN (
          SELECT productId, COUNT(*) AS likes
          FROM ${PRODUCT_LIKES_TABLE_NAME}
          GROUP BY productId
        ) l ON p.id = l.productId
        ORDER BY score DESC
        LIMIT 1
    `,
    })
  )[0];

  return (await getProductByIds([id]))[0];
}
