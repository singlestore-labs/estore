"use server";

import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";
import { normalizeDate } from "@repo/helpers";

import { forwardActionError } from "@/action/error/lib/forward";
import { Order } from "@/order/types";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function createOrder(productId: Product["id"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");
    const order: Order = { createdAt: normalizeDate(new Date()), productId, userId };
    await db.controllers.insertOne({ collection: ORDERS_TABLE_NAME, value: order });
  } catch (error) {
    return forwardActionError(error);
  }
}
