import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";
import { OrderRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProductSales(
  filter: Pick<Product, "id"> | Pick<Product, "description">,
): Promise<Product["sales"]> {
  try {
    let query = `\
      SELECT * FROM ${ORDERS_TABLE_NAME}
      WHERE createdAt >= CURDATE() - INTERVAL 90 DAY
    `;

    if ("id" in filter) {
      query += ` AND id = ${filter.id}`;
    } else if ("description" in filter) {
      query += ` AND description = ${filter.description.toLowerCase()}`;
    }

    const rows = await db.controllers.query<OrderRow[]>({ query });

    return [];
  } catch (error) {
    return [];
  }
}
