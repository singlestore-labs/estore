import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
} from "@repo/db/constants";
import { ProductRow, ProductSizeRow } from "@repo/db/types";

import { findProducts } from "@/product/lib/find";
import { getProducts } from "@/product/lib/get";
import { User } from "@/user/types";

export async function getRecommendedProducts(userId: User["id"], filter: Parameters<typeof getProducts>[0]) {
  const { limit = 5 } = filter;

  let productsRef = await db.controllers.query<
    (Pick<ProductRow, "id" | "title"> & { size: ProductSizeRow["value"] })[]
  >({
    query: `\
        SELECT id, title, size
        FROM (
            SELECT products.id, products.title, sizes.value as size
            FROM ${PRODUCT_SKU_TABLE_NAME} sku
            JOIN ${ORDERS_TABLE_NAME} orders ON sku.id = orders.product_sku_id
            JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
            JOIN ${PRODUCT_SIZES_TABLE_NAME} sizes ON sku.product_size_id = sizes.id
            WHERE orders.user_id = ${userId}
            UNION
            SELECT products.id, products.title, sizes.value as size
            FROM ${PRODUCT_LIKES_TABLE_NAME} likes
            JOIN ${PRODUCTS_TABLE_NAME} products ON likes.product_id = products.id
            JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON products.id = sku.product_id
            JOIN ${PRODUCT_SIZES_TABLE_NAME} sizes ON sku.product_size_id = sizes.id
            WHERE likes.user_id = ${userId}
        ) as combined
        LIMIT 5
    `,
  });

  productsRef = filterUniqueTitles(productsRef);

  const products = (
    await Promise.all(
      productsRef.flatMap(async (i) => {
        const products = (await findProducts(i.title, { limit: limit + 1, size: i.size })) || [];
        return products.filter((ii) => ii.id !== i.id);
      }),
    )
  ).flat();

  return shuffleProducts(products, limit);
}

function filterUniqueTitles<T extends any[]>(items: T) {
  const uniquePrompts = new Set<string>();
  return items.filter(({ title }) => !uniquePrompts.has(title) && uniquePrompts.add(title));
}

function shuffleProducts<T extends any[]>(items: T, limit: number) {
  return items
    .map((item) => [Math.random(), item])
    .sort(([a], [b]) => a - b)
    .map(([, item]) => item)
    .slice(0, limit);
}
