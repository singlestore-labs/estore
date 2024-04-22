import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProdcutById(id: Product["id"]): Promise<Product | undefined> {
  try {
    const existedProduct = await db.controllers.findOne<ProductRow>({
      collection: PRODUCTS_TABLE_NAME,
      where: `id = ${id}`,
      columns: ["id", "createdAt", "description", "image", "price", "gender"],
    });

    if (!existedProduct) return undefined;

    return { ...existedProduct, sales: [], sizes: {}, likes: 0 };
  } catch (error) {
    return undefined;
  }
}
