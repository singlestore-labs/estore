import { db } from "@repo/db";
import {
  ORDERS_TABLE_NAME,
  PRODUCTS_TABLE_NAME,
  PRODUCT_LIKES_TABLE_NAME,
  PRODUCT_SIZES_TABLE_NAME,
  PRODUCT_SKU_TABLE_NAME,
} from "@repo/db/constants";
import { ProductRow, ProductSizeRow } from "@repo/db/types";

import { findProducts } from "@/product/lib/find";
import { getProducts } from "@/product/lib/get";
import { User } from "@/user/types";

export async function getRecommendedProducts(userId: User["id"], filter: Parameters<typeof getProducts>[0]) {
  const { limit = 5 } = filter;

  const product = (
    await db.controllers.query<(Pick<ProductRow, "title" | "gender"> & { size: ProductSizeRow["value"] })[]>({
      query: `\
      SELECT products.title, products.gender, sizes.value as size
      FROM ${PRODUCT_SKU_TABLE_NAME} sku
      JOIN ${ORDERS_TABLE_NAME} orders ON sku.id = orders.product_sku_id
      JOIN ${PRODUCTS_TABLE_NAME} products ON sku.product_id = products.id
      JOIN ${PRODUCT_SIZES_TABLE_NAME} sizes ON sku.product_size_id = sizes.id
      WHERE orders.user_id = ${userId}
      UNION
      SELECT products.title, products.gender, sizes.value as size
      FROM ${PRODUCT_LIKES_TABLE_NAME} likes
      JOIN ${PRODUCTS_TABLE_NAME} products ON likes.product_id = products.id
      JOIN ${PRODUCT_SKU_TABLE_NAME} sku ON products.id = sku.product_id
      JOIN ${PRODUCT_SIZES_TABLE_NAME} sizes ON sku.product_size_id = sizes.id
      WHERE likes.user_id = ${userId}
      ORDER BY RAND()
      LIMIT 1
    `,
    })
  )?.[0];

  return product ? findProducts(product.title, { limit, size: product.size }) : [];
}
