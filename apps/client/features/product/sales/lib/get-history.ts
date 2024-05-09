import { db } from "@repo/db";

import { createGetProductSalesHistoryQuery } from "@/product/sales/queries/get-history";
import { Product } from "@/product/types";
import { parseQueryResult } from "@/query/lib/parse-query-result";

export async function getProductSalesHistory(
  ...args: Parameters<typeof createGetProductSalesHistoryQuery>
): Promise<Product["sales"]> {
  const result = await db.controllers.query<Product["sales"]>({
    query: createGetProductSalesHistoryQuery(...args),
  });

  return parseQueryResult(result);
}
