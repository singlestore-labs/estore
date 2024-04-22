import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { getProductLikesById } from "@/product/likes/lib/get-by-id";
import { getProductSales } from "@/product/sales/lib/get-by-id";
import { getProductSizesById } from "@/product/size/lib/get-by-id";
import { Product } from "@/product/types";

export async function getProducts({
  where,
  limit = 1,
}: Pick<Parameters<typeof db.controllers.findMany>[0], "limit" | "where">): Promise<Product[]> {
  try {
    const rows = await db.controllers.findMany<ProductRow[]>({
      collection: PRODUCTS_TABLE_NAME,
      columns: ["id", "createdAt", "description", "image", "price", "gender"],
      where,
      limit,
    });

    return await Promise.all(
      rows.map(async (i) => {
        const [sizes, likes, sales] = await Promise.all([
          getProductSizesById(i.id),
          getProductLikesById(i.id),
          getProductSales({ id: i.id }),
        ]);

        return { ...i, sizes, likes, sales };
      }),
    );
  } catch (error) {
    return [];
  }
}
