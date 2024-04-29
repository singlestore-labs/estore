import { db } from "@repo/db";
import { PRODUCT_SIZES_TABLE_NAME } from "@repo/db/constants";
import { ProductSizeRow } from "@repo/db/types";

import { getProductSKUByProductId } from "@/product/sku/lib/get-by-product-id";
import { Product } from "@/product/types";

export async function getProductSizesById(productId: Product["id"]): Promise<Product["sizes"]> {
  try {
    const [skuRows, sizeRows] = await Promise.all([
      getProductSKUByProductId(productId),
      db.controllers.findMany<ProductSizeRow[]>({
        collection: PRODUCT_SIZES_TABLE_NAME,
      }),
    ]);

    return skuRows.map((skuRow) => [
      skuRow.product_size_id,
      sizeRows.find((i) => i.id === skuRow.product_size_id)?.value || "",
      skuRow.stock,
    ]);
  } catch (error) {
    return [];
  }
}
