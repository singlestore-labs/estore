import { getProductsByTypeId } from "@/product/actions/get-by-type-id";
import { ProductCatalogItem } from "@/product/catalog/type";
import { getProductTypes } from "@/product/type/lib/get";

export async function getProductCatalog(
  filter: Parameters<typeof getProductsByTypeId>[1] = {},
): Promise<ProductCatalogItem[]> {
  try {
    const types = await getProductTypes();
    return await Promise.all(
      types.map(async (type) => {
        return [type, (await getProductsByTypeId(type.id, filter)) || []];
      }),
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}
