import { IS_DEV } from "@/constants/config";
import { getProductLikesById } from "@/product/likes/lib/get-by-id";
import { getProductSales } from "@/product/sales/lib/get-by-id";
import { getProductSizesById } from "@/product/size/lib/get-by-id";
import { Product } from "@/product/types";

type ProductInfo = Pick<Product, "sizes" | "likes" | "sales">;
type ProductInfoKeys = keyof ProductInfo;

const columnsConfig: {
  [K in ProductInfoKeys]: {
    defaultValue: ProductInfo[K];
    get: (id: Product["id"]) => Promise<ProductInfo[K]>;
  };
} = {
  sizes: {
    defaultValue: [],
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

const columnNames = Object.keys(columnsConfig) as ProductInfoKeys[];

export async function getProductInfoById(
  id: Product["id"],
  columns: ProductInfoKeys[] = columnNames,
): Promise<ProductInfo> {
  const result = await Promise.all(
    columnNames.map(async (columnName) => {
      const config = columnsConfig[columnName];
      let value = config.defaultValue;

      if (columns.includes(columnName)) {
        try {
          value = await config.get(id);
        } catch (error) {
          if (IS_DEV) console.error(error);
        }
      }

      return [columnName, value] as const;
    }),
  );

  return result.reduce((info, [key, value]) => ({ ...info, [key]: value }), {} as ProductInfo);
}
