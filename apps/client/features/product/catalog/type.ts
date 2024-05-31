import { ProductRow } from "@repo/db/types";

import { ProductType } from "@/product/type/type";

export type ProductCatalogItem = [ProductType, Pick<ProductRow, "id" | "title" | "image" | "price">[]];
