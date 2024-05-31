"use server";

import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";
import { ProductRow } from "@repo/db/types";

import { ProductType } from "@/product/type/type";

export async function getProductsByTypeId(
  typeId: ProductType["id"],
  filter: { offset?: number; limit?: number } = {},
) {
  const { offset = 0, limit = 10 } = filter;

  return db.controllers.query<Pick<ProductRow, "id" | "title" | "image" | "price">[]>({
    query: `
      SELECT id, title, image, price
      FROM ${PRODUCTS_TABLE_NAME}
      WHERE type_id = ${typeId}
      ORDER BY title
      LIMIT ${limit}
      OFFSET ${offset}
    `,
  });
}
