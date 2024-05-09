import { db } from "@repo/db";

import { getProductByIds } from "@/product/lib/get-by-ids";
import { createGetTopProductIdsQuery } from "@/product/queries/get-top-ids";
import { Product } from "@/product/types";

export async function getTopProduct(): Promise<Product | undefined> {
  const result = await db.controllers.query<{ id: Product["id"]; score: number }[]>({
    query: createGetTopProductIdsQuery({ limit: 1 }),
  });

  return (await getProductByIds([result[0].id]))[0];
}
