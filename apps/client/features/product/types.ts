import { ProductRow, ProductSKURow, ProductSizeRow } from "@repo/db/types";

import { Override } from "@/types";
import { PRODUCT_COLUMNS } from "@/product/constants";

export type Product = Override<
  Pick<ProductRow, (typeof PRODUCT_COLUMNS)[number]>,
  {
    likes: number;
    sizes: [ProductSizeRow["id"], ProductSizeRow["value"], ProductSKURow["stock"]][];
    sales: { value: number; date: string }[];
  }
>;
