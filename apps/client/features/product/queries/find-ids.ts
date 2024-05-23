import { PRODUCT_SKU_TABLE_NAME, PRODUCT_SIZES_TABLE_NAME, PRODUCTS_TABLE_NAME } from "@repo/db/constants";

export function createFindProductIdsQuery(
  promptEmbedding: number[] | "",
  filter: {
    color?: string;
    price?: number;
    priceMin?: number;
    priceMax?: number;
    gender?: (string & {}) | "women" | "unisex";
    size?: (string & {}) | "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "oneSize";
    limit?: number;
  } = {},
) {
  const { color, price, priceMin, priceMax, gender, size, limit = 5 } = filter;
  const promptEmbeddingJSON = promptEmbedding ? JSON.stringify(promptEmbedding) : "";
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

  return `\
${promptEmbeddingJSON ? `SET @promptEmbedding = '${promptEmbeddingJSON}' :> vector(${promptEmbedding.length}) :> blob;` : ""}
SELECT
  ft_result.id,
  ft_score_color,
  v_score_title,
  v_score_description,
  0.5 * IFNULL(ft_score_color, 0) + 0.5 * IFNULL(v_score_title + v_score_description, 0) AS score
FROM (
  SELECT
    products.id,
    ${color ? `MATCH(products.description) AGAINST ('${color}')` : "1"} AS ft_score_color
  FROM ${PRODUCTS_TABLE_NAME} products
  ${join ? `JOIN ${join}` : ""}
  WHERE ft_score_color
  ${where ? `AND ${where}` : ""}
) ft_result FULL OUTER JOIN (
  SELECT
    products.id,
    ${promptEmbeddingJSON ? `products.title_v <*> @promptEmbedding` : "1"} AS v_score_title,
    ${promptEmbeddingJSON ? `products.description_v <*> @promptEmbedding` : "1"} AS v_score_description
  FROM ${PRODUCTS_TABLE_NAME} products
  ${join ? `JOIN ${join}` : ""}
  WHERE v_score_title >= 0.75 OR v_score_description >= 0.75
  ${where ? `AND ${where}` : ""}
  ORDER BY v_score_title + v_score_description DESC
  LIMIT 100
) v_result
ON ft_result.id = v_result.id
WHERE ft_score_color AND (v_score_title OR v_score_description)
ORDER BY score DESC
LIMIT ${limit};
`;
}
