"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { sleep } from "@/helpers";
import { Product } from "@/product/types";

export async function purchaseProduct(id: Product["id"]) {
  try {
    await sleep();
  } catch (error) {
    return forwardActionError(error);
  }
}
