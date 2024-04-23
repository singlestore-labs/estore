import { db } from "@repo/db";
import { ProductRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getProductRandomId(): Promise<Product["id"]> {
  const product = (
    await db.controllers.query<Pick<ProductRow, "id">[]>({
      query: `SELECT id FROM products ORDER BY RAND() LIMIT 1;`,
    })
  )[0];

  return product.id;
}
