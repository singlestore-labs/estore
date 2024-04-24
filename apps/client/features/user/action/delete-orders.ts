"use server";

import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";

import { forwardActionError } from "@/action/error/lib/forward";
import { getUserId } from "@/user/lib/get-id";

export async function deleteUserOrders() {
  try {
    const userId = await getUserId();
    await db.controllers.deleteMany({ collection: ORDERS_TABLE_NAME, where: `userId = ${userId}` });
  } catch (error) {
    return forwardActionError(error);
  }
}
