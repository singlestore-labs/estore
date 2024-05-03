import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME, PRODUCT_SIZES_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { getProductByIds } from "@/product/lib/get-by-ids";

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

export async function findProducts(
  prompt: string,
  filter: {
    color?: string;
    price?: number;
    priceMin?: number;
    priceMax?: number;
    gender?: "women" | "unisex";
    size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "oneSize";
    limit?: number;
  },
) {
  const { color, price, priceMin, priceMax, gender, size, limit = 5 } = filter;
  const promptV = prompt ? (await db.ai.createEmbedding(prompt))[0] : "";
  const promptVJSON = promptV ? JSON.stringify(promptV) : "";
  const whereDefinitions: string[] = [];
  const joinDefinitions: string[] = [];

  if (price) {
    whereDefinitions.push(`price = ${price}`);
  } else if (priceMin && priceMax) {
    whereDefinitions.push(`price BETWEEN ${priceMin} AND ${priceMax}`);
  } else if (priceMin) {
    whereDefinitions.push(`price >= ${priceMin}`);
  } else if (priceMax) {
    whereDefinitions.push(`price <= ${priceMax}`);
  }

  if (size) {
    joinDefinitions.push(`${PRODUCT_SKU_TABLE_NAME} sku ON products.id = sku.product_id`);
    joinDefinitions.push(
      `${PRODUCT_SIZES_TABLE_NAME} size ON sku.product_size_id = size.id AND size.value = '${size}'`,
    );
  }

  if (gender) whereDefinitions.push(`gender = '${gender}'`);

  const where = whereDefinitions.join(" AND ");
  const join = joinDefinitions.join(" JOIN ");

  let query = `\
    ${promptVJSON ? `SET @promptV = '${promptVJSON}' :> vector(${promptV.length}) :> blob;` : ""}
    SELECT
      ft_result.id,
      ft_score_color,
      v_score_image_text,
      v_score_description,
      0.5 * IFNULL(ft_score_color, 0) + 0.5 * IFNULL(v_score_image_text + v_score_description, 0) AS score
    FROM (
      SELECT
        products.id,
        ${color ? `MATCH(products.image_text) AGAINST ('${color}')` : "1"} AS ft_score_color
      FROM ${PRODUCTS_TABLE_NAME} products
      ${join ? `JOIN ${join}` : ""}
      WHERE ft_score_color
      ${where ? `AND ${where}` : ""}
    ) ft_result FULL OUTER JOIN (
      SELECT
        products.id,
        ${promptVJSON ? `products.image_text_v <*> @promptV` : "1"} AS v_score_image_text,
        ${promptVJSON ? `products.description_v <*> @promptV` : "1"} AS v_score_description
      FROM ${PRODUCTS_TABLE_NAME} products
      ${join ? `JOIN ${join}` : ""}
      WHERE v_score_image_text >= 0.75 OR v_score_description >= 0.75
      ${where ? `AND ${where}` : ""}
      ORDER BY v_score_image_text + v_score_description DESC
      LIMIT 100
    ) v_result
    ON ft_result.id = v_result.id
    WHERE ft_score_color AND (v_score_image_text OR v_score_description)
    ORDER BY score DESC
    LIMIT ${limit};
  `;

  const result = await db.controllers.query<[object, QueryResult[]] | QueryResult[]>({ query });
  const productIds = (isQueryResult(result) ? result : result[1]).map((i) => i.id);

  return getProductByIds(productIds);
}
