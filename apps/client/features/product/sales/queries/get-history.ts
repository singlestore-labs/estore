import { ORDERS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME, PRODUCTS_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export function createGetProductSalesHistoryQuery(
  where: Pick<Product, "id"> | Pick<Product, "title">,
  { interval = 6, intervalUnit = "MONTH" }: { interval?: number; intervalUnit?: "DAY" | "WEEK" | "MONTH" } = {},
) {
  const [[key, value]] = Object.entries(where).map(([key, value]) => [
    key.toLowerCase(),
    typeof value === "string" ? value.toLocaleLowerCase() : value,
  ]);

  return `\
SELECT COUNT(*) AS value, DATE(orders.created_at) AS date
FROM ${ORDERS_TABLE_NAME} orders
JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
WHERE products.${key} = ${value}
  AND orders.created_at >= (SELECT CURDATE() - INTERVAL ${interval} ${intervalUnit})
GROUP BY DATE(orders.created_at)
ORDER BY DATE(orders.created_at)
`;
}
