"use server";

import { db } from "@repo/db";
import { PRODUCT_LIKES_TABLE_NAME } from "@repo/db/constants";

import { forwardActionError } from "@/action/error/lib/forward";
import { getUserId } from "@/user/lib/get-id";

export async function deleteUserLikes() {
  try {
    const userId = await getUserId();
    await db.controllers.deleteMany({ collection: PRODUCT_LIKES_TABLE_NAME, where: `user_id = ${userId}` });
  } catch (error) {
    return forwardActionError(error);
  }
}
