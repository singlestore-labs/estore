"use server";

import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";
import { serializeDate } from "@repo/db/lib/serialize-date";
import { revalidatePath } from "next/cache";

import { forwardActionError } from "@/action/error/lib/forward";
import { ROUTES } from "@/constants/routes";
import { ProdcutLike } from "@/product/likes/types";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function createProductLike(productId: Product["id"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");
    const like: Omit<ProdcutLike, "id"> = {
      created_at: serializeDate(new Date()),
      product_id: productId,
      user_id: userId,
    };
    const newLike = (await db.controllers.insertOne({
      collection: PRODUCT_LIKES_TABLE_NAME,
      value: like,
    })) as ProdcutLike;
    revalidatePath(ROUTES.ROOT);
    return newLike;
  } catch (error) {
    return forwardActionError(error);
  }
}
