import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
} from "@repo/db/constants";

export function createGetTopProductIdsQuery({ limit = 10 }: { limit?: number } = {}) {
  return `\
SELECT products.id, orders.count + likes.count AS score
FROM ${PRODUCTS_TABLE_NAME} products
JOIN (
  SELECT sku.product_id, sku.stock, COUNT(*) AS count
  FROM ${ORDERS_TABLE_NAME} orders
  JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
  GROUP BY sku.product_id
) orders ON products.id = orders.product_id
JOIN (
  SELECT product_id, COUNT(*) AS count
  FROM ${PRODUCT_LIKES_TABLE_NAME}
  GROUP BY product_id
) likes ON products.id = likes.product_id
ORDER BY score DESC, products.title ASC
LIMIT ${limit}
`;
}
