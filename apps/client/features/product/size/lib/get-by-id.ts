import { db } from "@repo/db";
import { PRODUCT_SIZES_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductSKURow, ProductSizeRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProductSizesById(productId: Product["id"]): Promise<Product["sizes"]> {
  const result = await db.controllers.query<
    { id: ProductSKURow["product_size_id"]; value: ProductSizeRow["value"]; stock: ProductSKURow["stock"] }[]
  >({
    query: `\
      SELECT product_size_id as id, sizes.value, stock
      FROM ${PRODUCT_SKU_TABLE_NAME} sku
      JOIN ${PRODUCT_SIZES_TABLE_NAME} sizes ON sizes.id = sku.product_size_id
      WHERE sku.product_id = ${productId}
      ORDER BY sizes.value DESC
    `,
  });

  return result.map(({ id, value, stock }) => [id, value, stock]);
}
