import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function getProductSales(
  filter: Pick<Product, "id"> | Pick<Product, "description">,
  length: number = 30,
): Promise<Product["sales"]> {
  const [[filterKey, filterValue]] = Object.entries(filter);

  const result = await db.controllers.query<Product["sales"]>({
    query: `\
      SELECT COUNT(*) AS value, DATE(orders.created_at) AS date
      FROM ${ORDERS_TABLE_NAME} orders
      JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON orders.product_sku_id = sku.id
      JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
      WHERE LOWER(products.${filterKey}) = LOWER(${filterValue})
        AND orders.created_at >= (SELECT CURDATE() - INTERVAL ${length} DAY)
      GROUP BY DATE(orders.created_at)
      ORDER BY DATE(orders.created_at)
  `,
  });

  return result.map((i) => ({ ...i, date: new Date(i.date).toLocaleDateString("en-US", { hour12: false }) }));
}
