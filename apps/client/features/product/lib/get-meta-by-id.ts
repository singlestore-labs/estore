import { getProductLikesById } from "@/product/likes/lib/get-by-id";
import { getProductSales } from "@/product/sales/lib/get-by-id";
import { getProductSizesById } from "@/product/size/lib/get-by-id";
import { Product } from "@/product/types";

type ProductMeta = Pick<Product, "sizes" | "likes" | "sales">;
type ProductMetaKeys = keyof ProductMeta;

const columnMap: {
  [K in ProductMetaKeys]: {
    defaultValue: ProductMeta[K];
    get: (id: Product["id"]) => Promise<ProductMeta[K]>;
  };
} = {
  sizes: {
    defaultValue: {},
    get: getProductSizesById,
  },
  likes: {
    defaultValue: 0,
    get: getProductLikesById,
  },
  sales: {
    defaultValue: [],
    get: (id) => getProductSales({ id }),
  },
};

const columnMapKeys = Object.keys(columnMap) as ProductMetaKeys[];

export async function getProductMetaById(
  id: Product["id"],
  columns: ProductMetaKeys[] = columnMapKeys,
): Promise<ProductMeta> {
  const result = await Promise.all(
    columnMapKeys.map(async (key) => {
      const column = columnMap[key];
      const value = columns.includes(key) ? await column.get(id) : column.defaultValue;
      return [key, value] as const;
    }),
  );

  return result.reduce((meta, [key, value]) => ({ ...meta, [key]: value }), {} as ProductMeta);
}
