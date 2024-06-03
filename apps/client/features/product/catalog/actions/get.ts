"use server";

import { getProductsByTypeId } from "@/product/actions/get-by-type-id";
import { ProductCatalogItem } from "@/product/catalog/type";
import { getProductTypes } from "@/product/type/lib/get";

export async function getProductCatalog(
  filter: Parameters<typeof getProductTypes>[0] & { products?: Parameters<typeof getProductsByTypeId>[1] } = {},
): Promise<ProductCatalogItem[]> {
  try {
    const types = await getProductTypes(filter);
    return await Promise.all(
      types.map(async (type) => {
        return [type, (await getProductsByTypeId(type.id, filter.products)) || []];
      }),
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
