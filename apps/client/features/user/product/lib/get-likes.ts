import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";
import { ProductLikeRow } from "@repo/db/types";

import { ProdcutLike } from "@/product/likes/types";
import { getUserId } from "@/user/lib/get-id";

export async function getUserProductLikes(): Promise<ProdcutLike[]> {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");
    return db.controllers.findMany<ProductLikeRow[]>({
      collection: PRODUCT_LIKES_TABLE_NAME,
      where: `user_id = ${userId}`,
    });
  } catch (error) {
    return [];
  }
}
