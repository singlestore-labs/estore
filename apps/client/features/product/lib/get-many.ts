import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { PRODUCT_COLUMNS } from "@/product/constants";
import { getProductMetaById } from "@/product/lib/get-meta-by-id";
import { Product } from "@/product/types";

export async function getProducts({
  where,
  limit = 1,
}: Pick<Parameters<typeof db.controllers.findMany>[0], "limit" | "where">): Promise<Product[]> {
  try {
    const rows = await db.controllers.findMany<ProductRow[]>({
      collection: PRODUCTS_TABLE_NAME,
      columns: PRODUCT_COLUMNS,
      where,
      limit,
    });

    return await Promise.all(rows.map(async (i) => ({ ...i, ...(await getProductMetaById(i.id)) })));
  } catch (error) {
    return [];
  }
}
