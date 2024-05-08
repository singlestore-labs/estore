import { db } from "@repo/db";
import { ProductRow } from "@repo/db/types";

import { getProductByIds } from "@/product/lib/get-by-ids";
import { createFindProductsQuery } from "@/product/queries/find";

type QueryResult = {
  id: ProductRow["id"];
  ft_score_color: number;
  v_score_image_text: number;
  v_score_description: number;
  score: number;
};

function isQueryResult(value: any[]): value is QueryResult[] {
  return typeof value[0] === "object" && "id" in value[0];
}

export async function findProducts(prompt: string, filter: Parameters<typeof createFindProductsQuery>[1]) {
  const promptEmbedding = prompt ? (await db.ai.createEmbedding(prompt))[0] : "";
  const query = await createFindProductsQuery(promptEmbedding, filter);
  const result = await db.controllers.query<[object, QueryResult[]] | QueryResult[]>({ query });
  const productIds = (isQueryResult(result) ? result : result[1]).map((i) => i.id);
  return getProductByIds(productIds);
}
