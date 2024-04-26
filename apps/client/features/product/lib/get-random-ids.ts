import { db } from "@repo/db";
import { ProductRow } from "@repo/db/types";

import { Product } from "@/product/types";

export async function getRandomProductIds({ limit = 1 }: { limit?: number } = {}): Promise<Product["id"][]> {
  const products = await db.controllers.query<Pick<ProductRow, "id">[]>({
    query: `SELECT id FROM products ORDER BY RAND() LIMIT ${limit};`,
  });

  return products.map((i) => i.id);
}
