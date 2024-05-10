import { db } from "@repo/db";

import { getProductByIds } from "@/product/lib/get-by-ids";
import { createGetTopProductIdsQuery } from "@/product/queries/get-top-ids";
import { Product } from "@/product/types";

export async function getTopProducts(
  ...args: Parameters<typeof createGetTopProductIdsQuery>
): Promise<Product[]> {
  const result = await db.controllers.query<{ id: Product["id"]; score: number }[]>({
    query: createGetTopProductIdsQuery(...args),
  });

  return await getProductByIds(result.map((i) => i.id));
}
