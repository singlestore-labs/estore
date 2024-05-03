import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { PRODUCT_COLUMNS } from "@/product/constants";
import { getProductInfoById } from "@/product/lib/get-info-by-id";
import { Product } from "@/product/types";

export async function getProducts({
  where,
  columns = PRODUCT_COLUMNS,
  limit,
  metaColumns,
}: Pick<Parameters<typeof db.controllers.findMany>[0], "limit" | "where" | "columns"> & {
  metaColumns?: Parameters<typeof getProductInfoById>[1];
}): Promise<Product[]> {
  try {
    const products = await db.controllers.findMany<ProductRow[]>({
      collection: PRODUCTS_TABLE_NAME,
      columns,
      where,
      limit,
    });

    return await Promise.all(
      products.map(async (i) => ({ ...i, ...(await getProductInfoById(i.id, metaColumns)) })),
    );
  } catch (error) {
    return [];
  }
}
