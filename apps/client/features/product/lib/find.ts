import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME, PRODUCT_SIZES_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

import { IS_DEV } from "@/constants/env";
import { getProductByIds } from "@/product/lib/get-by-ids";

export async function findProducts(
  prompt: string,
  filter: {
    color?: string;
    priceMin?: number;
    priceMax?: number;
    gender?: "women" | "unisex";
    size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "oneSize";
    limit?: number;
  },
) {
  if (IS_DEV) console.log({ prompt, filter });

  const { color, priceMin, priceMax, gender, size, limit = 1 } = filter;
  const promptV = JSON.stringify((await db.ai.createEmbedding(prompt))[0]);
  const whereConditions: string[] = [];
  const joins: string[] = [];

  if (gender) whereConditions.push(`gender = '${gender}'`);
  if (priceMin && priceMax) whereConditions.push(`price BETWEEN ${priceMin} AND ${priceMax}`);
  else if (priceMin) whereConditions.push(`price >= ${priceMin}`);
  else if (priceMax) whereConditions.push(`price <= ${priceMax}`);

  if (size) {
    joins.push(`${PRODUCT_SKU_TABLE_NAME} sku ON p.id = sku.product_id`);
    joins.push(`${PRODUCT_SIZES_TABLE_NAME} size ON sku.product_size_id = size.id AND size.value = '${size}'`);
  }

  const where = whereConditions.join(" AND ");
  const join = joins.length ? `JOIN ${joins.join(" JOIN ")}` : "";

  let query = `\
    SELECT ft_result.id, ft_score, v_score, 0.5 * IFNULL(ft_score, 0) + 0.5 * IFNULL(v_score, 0) AS score
    FROM (
      SELECT p.id, ${color ? `MATCH(p.image_text) AGAINST ('${color}')` : "1"} AS ft_score
      FROM ${PRODUCTS_TABLE_NAME} p
      ${join}
      WHERE ft_score
      ${where ? `AND ${where}` : ""}
    ) ft_result FULL OUTER JOIN (
      SELECT p.id, p.image_text_v <*> '${promptV}' AS v_score
      FROM ${PRODUCTS_TABLE_NAME} p
      ${join}
      ${where ? `WHERE ${where}` : ""}
      ORDER BY v_score DESC
      LIMIT 100
    ) v_result
    ON ft_result.id = v_result.id
    ORDER BY score DESC
    LIMIT ${limit}
  `;

  const result = await db.controllers.query<{ id: number }[]>({ query });

  if (IS_DEV) console.log({ query, result });

  return getProductByIds(result.map((i) => i.id));
}
