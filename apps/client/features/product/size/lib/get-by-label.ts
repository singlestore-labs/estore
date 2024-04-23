import { db } from "@repo/db";
import { PRODUCT_SIZES_TABLE_NAME } from "@repo/db/constants";
import { ProductSizeRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProductSizeByLabel(
  productId: Product["id"],
  label: keyof Product["sizes"],
): Promise<ProductSizeRow | undefined> {
  try {
    return db.controllers.findOne({
      collection: PRODUCT_SIZES_TABLE_NAME,
      where: `productId = ${productId} AND label = '${label}'`,
    });
  } catch (error) {
    return undefined;
  }
}
