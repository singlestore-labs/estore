"use server";

import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";
import { normalizeDate } from "@repo/helpers";
import { revalidatePath } from "next/cache";

import { forwardActionError } from "@/action/error/lib/forward";
import { ROUTES } from "@/constants/routes";
import { Order } from "@/order/types";
import { getProductSizeByLabel } from "@/product/size/lib/get-by-label";
import { setProdcutSizeInStock } from "@/product/size/lib/set-in-stock";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function createOrder(productId: Product["id"], size: keyof Product["sizes"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");

    const productSize = await getProductSizeByLabel(productId, size);

    const order: Order = {
      createdAt: normalizeDate(new Date()),
      productId,
      userId,
      productSizeId: productSize?.id || null,
    };

    await db.controllers.insertOne({ collection: ORDERS_TABLE_NAME, value: order });

    if (productSize) {
      await setProdcutSizeInStock(productSize.id, productSize.inStock - 1);
    }

    revalidatePath(ROUTES.ROOT);
  } catch (error) {
    return forwardActionError(error);
  }
}
