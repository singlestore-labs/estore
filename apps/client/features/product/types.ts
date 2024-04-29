import { ProductRow, ProductSKURow, ProductSizeRow } from "@repo/db/types";

import { Override } from "@/types";

export type Product = Override<
  ProductRow,
  {
    likes: number;
    sizes: [ProductSizeRow["id"], ProductSizeRow["value"], ProductSKURow["stock"]][];
    sales: { value: number; date: string }[];
  }
>;
