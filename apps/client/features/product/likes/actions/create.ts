"use server";

import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";
import { normalizeDate } from "@repo/helpers";

import { forwardActionError } from "@/action/error/lib/forward";
import { ProdcutLike } from "@/product/likes/types";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function createProductLike(productId: Product["id"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");
    const like: ProdcutLike = { createdAt: normalizeDate(new Date()), productId, userId };
    return (await db.controllers.insertOne({
      collection: PRODUCT_LIKES_TABLE_NAME,
      value: like,
    })) as ProdcutLike;
  } catch (error) {
    return forwardActionError(error);
  }
}
