import { ProductTypeRow } from "@repo/db/types";

export type ProductType = ProductTypeRow & { products_count: number };
