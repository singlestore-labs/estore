import { PRODUCTS_TABLE_NAME, PRODUCT_SIZES_TABLE_NAME, PRODUCT_SKU_TABLE_NAME } from "@repo/db/constants";

export function createFindProductIdsQuery(
  promptEmbedding: number[] | "",
  filter: {
    color?: string;
    price?: number;
    priceMin?: number;
    priceMax?: number;
    size?: (string & {}) | "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "oneSize";
    limit?: number;
  } = {},
) {
  const { color, price, priceMin, priceMax, size, limit = 5 } = filter;
  const promptEmbeddingJSON = promptEmbedding ? JSON.stringify(promptEmbedding) : "";

  let priceDefinition = "";
  if (price) {
    priceDefinition = `price = ${price}`;
  } else if (priceMin && priceMax) {
    priceDefinition = `price BETWEEN ${priceMin} AND ${priceMax}`;
  } else if (priceMin) {
    priceDefinition = `price >= ${priceMin}`;
  } else if (priceMax) {
    priceDefinition = `price <= ${priceMax}`;
  }

  return `\
SET @promptEmbedding = '${promptEmbeddingJSON}' :> vector(${promptEmbedding.length}) :> blob;
SELECT
  ${PRODUCTS_TABLE_NAME}.id,
  ${color ? `MATCH(description) AGAINST ('${color}')` : "1"} AS ft_score_color,
  title_v <*> @promptEmbedding AS v_score_title,
  description_v <*> @promptEmbedding AS v_score_description,
  ft_score_color + v_score_title + v_score_description AS score
FROM ${PRODUCTS_TABLE_NAME}
JOIN ${PRODUCT_SKU_TABLE_NAME} ON ${PRODUCTS_TABLE_NAME}.id = ${PRODUCT_SKU_TABLE_NAME}.product_id
${size ? `JOIN ${PRODUCT_SIZES_TABLE_NAME} ON ${PRODUCT_SKU_TABLE_NAME}.product_size_id = ${PRODUCT_SIZES_TABLE_NAME}.id AND ${PRODUCT_SIZES_TABLE_NAME}.value = '${size}'` : ""}
WHERE ft_score_color AND (v_score_title >= 0.75 OR v_score_description >= 0.75) ${priceDefinition ? `AND ${priceDefinition}` : ""}
GROUP BY ${PRODUCTS_TABLE_NAME}.id
ORDER BY score DESC
LIMIT ${limit}
`;
}
