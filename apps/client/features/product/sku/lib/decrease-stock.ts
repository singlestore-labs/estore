import { db } from "@repo/db";
import { PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductSKURow } from "@repo/db/types";

export function decreaseSKUStock(id: ProductSKURow["id"]) {
  return db.controllers.query({
    query: `\
      UPDATE ${PRODUCT_SKU_TABLE_NAME}
      SET stock = stock - 1
      WHERE id = ${id}
  `,
  });
}
