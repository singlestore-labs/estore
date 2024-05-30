import { writeFile } from "fs/promises";
import path from "path";

import { db } from "@repo/db";
import { ProductRow } from "@repo/db/types";

import { IS_DEV } from "@/constants/config";
import { getProductByIds } from "@/product/lib/get-by-ids";
import { createFindProductIdsQuery } from "@/product/queries/find-ids";
import { parseQueryResult } from "@/query/lib/parse-query-result";
import { QueryResult } from "@/query/types";

type Result = {
  id: ProductRow["id"];
  ft_score_color: number;
  v_score_title: number;
  v_score_description: number;
  score: number;
};

export async function findProducts(prompt: string, filter?: Parameters<typeof createFindProductIdsQuery>[1]) {
  if (IS_DEV) console.log({ prompt, filter });

  const promptEmbedding = prompt ? (await db.ai.createEmbedding(prompt))[0] : "";
  const query = createFindProductIdsQuery(promptEmbedding, filter);

  const result = await db.controllers.query<QueryResult<Result>>({ query });

  if (IS_DEV) {
    await Promise.all([
      writeFile(path.join(process.cwd(), "export/findProducts.txt"), query),
      writeFile(path.join(process.cwd(), "export/findProducts-result.txt"), JSON.stringify(result, null, 2)),
    ]);
  }
  const productIds = parseQueryResult(result).map((i) => i.id);
  return getProductByIds(productIds);
}
