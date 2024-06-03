import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME, PRODUCT_TYPES_TABLE_NAME } from "@repo/db/constants";

import { ProductType } from "@/product/type/type";

export function getProductTypes(filter: { offset?: number; limit?: number } = {}) {
  const { offset = 0, limit = 100 } = filter;

  return db.controllers.query<ProductType[]>({
    query: `
    SELECT product_types.*, COUNT(products.id) AS products_count
    FROM ${PRODUCT_TYPES_TABLE_NAME} product_types
    LEFT JOIN ${PRODUCTS_TABLE_NAME} products ON product_types.id = products.type_id
    GROUP BY product_types.id, product_types.label
    ORDER BY products_count DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `,
  });
}
