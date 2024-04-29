import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function getProductSales(
  filter: Pick<Product, "id"> | Pick<Product, "description">,
  length: number = 30,
): Promise<Product["sales"]> {
  try {
    const [[filterKey, filterValue]] = Object.entries(filter);

    const product = await db.controllers.findOne({
      collection: PRODUCTS_TABLE_NAME,
      columns: ["id"],
      where: `LOWER(${filterKey}) = ${typeof filterValue === "string" ? `'${filterValue.toLowerCase()}'` : filterValue}`,
    });

    if (!product) return [];

    let query = `\
      SELECT COUNT(*) AS value, DATE(orders.created_at) AS date
      FROM ${ORDERS_TABLE_NAME} AS orders
      JOIN (
        SELECT id FROM ${PRODUCT_SKU_TABLE_NAME}
        WHERE product_id = ${product.id}
      ) AS sku ON orders.product_sku_id = sku.id
      WHERE orders.created_at >= (SELECT CURDATE() - INTERVAL ${length} DAY)
      GROUP BY DATE(orders.created_at)
      ORDER BY DATE(orders.created_at)
    `;

    return (await db.controllers.query<Product["sales"]>({ query }))
      .map((i) => ({
        ...i,
        date: new Date(i.date).toLocaleDateString("en-US", { hour12: false }),
      }))
      .slice(-length);
  } catch (error) {
    console.error(error);
    return [];
  }
}
