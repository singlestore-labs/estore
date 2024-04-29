import { db } from "@repo/db";
import { PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductSKURow } from "@repo/db/types";

import { Product } from "@/product/types";

export function getProductSKUByProductId(productId: Product["id"]) {
  return db.controllers.findMany<ProductSKURow[]>({
    collection: PRODUCT_SKU_TABLE_NAME,
    where: `product_id = ${productId}`,
  });
}
