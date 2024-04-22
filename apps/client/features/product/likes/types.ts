import { ProductLikeRow } from "@repo/db/types";

export type ProdcutLike = Omit<ProductLikeRow, "id">;
