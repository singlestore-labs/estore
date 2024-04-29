import { db } from "@repo/db";
import { PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductSKURow, ProductSizeRow } from "@repo/db/types";

import { Product } from "@/product/types";

export function getProductSKUByProductIdAndSizeId(productId: Product["id"], sizeId: ProductSizeRow["id"]) {
  return db.controllers.findOne<ProductSKURow>({
    collection: PRODUCT_SKU_TABLE_NAME,
    where: `product_id = ${productId} and product_size_id = ${sizeId}`,
  });
}
