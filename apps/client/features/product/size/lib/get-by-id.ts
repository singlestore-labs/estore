import { db } from "@repo/db";
import { PRODUCT_SIZES_TABLE_NAME } from "@repo/db/constants";
import { ProductSizeRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProductSizesById(id: Product["id"]): Promise<Product["sizes"]> {
  try {
    const rows = await db.controllers.findMany<ProductSizeRow[]>({
      collection: PRODUCT_SIZES_TABLE_NAME,
      where: `productId = ${id}`,
      extra: `ORDER BY label DESC`,
    });

    return Object.fromEntries(rows.map((i) => [i.label, i.inStock]));
  } catch (error) {
    return {};
  }
}
