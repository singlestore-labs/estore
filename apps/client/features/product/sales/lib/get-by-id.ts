import { db } from "@repo/db";
import { ORDERS_TABLE_NAME, PRODUCTS_TABLE_NAME } from "@repo/db/constants";

import { Product } from "@/product/types";

export async function getProductSales(
  filter: Pick<Product, "id"> | Pick<Product, "description">,
  length: number = 30,
): Promise<Product["sales"]> {
  try {
    const [[filterKey, filterValue]] = Object.entries(filter);

    const product = await db.controllers.findOne({
      collection: PRODUCTS_TABLE_NAME,
      where: `LOWER(${filterKey}) = ${typeof filterValue === "string" ? filterValue.toLowerCase() : filterValue}`,
    });

    if (!product) return [];

    let query = `\
      SELECT COUNT(*) AS value, DATE(createdAt) AS date FROM ${ORDERS_TABLE_NAME}
      WHERE createdAt >= CURDATE() - INTERVAL ${length} DAY
      AND productId = ${product.id}
      GROUP BY DATE(createdAt)
      ORDER BY DATE(createdAt)
    `;

    return (await db.controllers.query<Product["sales"]>({ query }))
      .map((i) => ({
        ...i,
        date: new Date(i.date).toLocaleDateString("en-US", { hour12: false }),
      }))
      .slice(-length);
  } catch (error) {
    console.log(error);
    return [];
  }
}
