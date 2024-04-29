"use server";

import { db } from "@repo/db";
import { ORDERS_TABLE_NAME } from "@repo/db/constants";
import { ProductSizeRow } from "@repo/db/types";
import { normalizeDate } from "@repo/helpers";
import { revalidatePath } from "next/cache";

import { forwardActionError } from "@/action/error/lib/forward";
import { ROUTES } from "@/constants/routes";
import { Order } from "@/order/types";
import { decreaseSKUStock } from "@/product/sku/lib/decrease-stock";
import { getProductSKUByProductIdAndSizeId } from "@/product/sku/lib/get-by-product-id-and-size-id";
import { Product } from "@/product/types";
import { getUserId } from "@/user/lib/get-id";

export async function createOrder(productId: Product["id"], sizeId: ProductSizeRow["id"]) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("userId is undefined");

    const product_sku_id = (await getProductSKUByProductIdAndSizeId(productId, sizeId))?.id;
    if (!product_sku_id) throw new Error("Prodcut SKU is not found");

    const value: Omit<Order, "id"> = {
      created_at: normalizeDate(new Date()),
      user_id: userId,
      product_sku_id,
    };

    await Promise.all([
      db.controllers.insertOne({ collection: ORDERS_TABLE_NAME, value }),
      decreaseSKUStock(product_sku_id),
    ]);

    revalidatePath(ROUTES.ROOT);
  } catch (error) {
    return forwardActionError(error);
  }
}
