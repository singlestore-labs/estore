import { db } from "@repo/db";
import { PRODUCT_SIZES_TABLE_NAME } from "@repo/db/constants";
import { ProductSizeRow } from "@repo/db/types";

export function setProdcutSizeInStock(id: ProductSizeRow["id"], inStock: ProductSizeRow["inStock"]) {
  return db.controllers.updateMany({
    collection: PRODUCT_SIZES_TABLE_NAME,
    set: `inStock = ${inStock}`,
    where: `id = ${id}`,
  });
}
