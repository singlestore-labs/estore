"use server";

import { forwardActionError } from "@/action/error/lib/forward";
import { getProductByIds as _getProductByIds } from "@/product/lib/get-by-ids";

export async function getProductByIds(...args: Parameters<typeof _getProductByIds>) {
  try {
    return _getProductByIds(...args);
  } catch (error) {
    return forwardActionError(error);
  }
}
