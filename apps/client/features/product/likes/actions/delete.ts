"use server";

import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";

import { forwardActionError } from "@/action/error/lib/forward";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function deleteProductLike(productId: Product["id"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");
    await db.controllers.deleteMany({
      collection: PRODUCT_LIKES_TABLE_NAME,
      where: `productId = ${productId} AND userId = ${userId}`,
    });
  } catch (error) {
    return forwardActionError(error);
  }
}
