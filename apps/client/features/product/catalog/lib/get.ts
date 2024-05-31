import { db } from "@repo/db";
import { PRODUCTS_TABLE_NAME } from "@repo/db/constants";

import { ProductCatalogItem } from "@/product/catalog/type";
import { getProductTypes } from "@/product/type/lib/get";

export async function getProductCatalog(
  filter: { offset?: number; limit?: number } = {},
): Promise<ProductCatalogItem[]> {
  const { offset = 0, limit = 3 } = filter;

  try {
    const types = await getProductTypes();

    const getProducts = (typeId: (typeof types)[number]["id"]) => {
      return db.controllers.query<ProductCatalogItem[1]>({
        query: `
          SELECT id, title, image, price
          FROM ${PRODUCTS_TABLE_NAME}
          WHERE type_id = ${typeId}
          ORDER BY title
          LIMIT ${limit}
          OFFSET ${offset}
        `,
      });
    };

    return await Promise.all(types.map(async (type) => [type, (await getProducts(type.id)) || []]));
  } catch (error) {
    console.error(error);
    return [];
  }
}
