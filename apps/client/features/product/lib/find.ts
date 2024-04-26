import { db } from "@repo/db";

import { getProductByIds } from "@/product/lib/get-by-ids";

export async function findProducts(
  prompt: string,
  filter: {
    color?: string;
    priceMax?: number;
    priceMin?: number;
    gender?: "women" | "unisex";
    size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl";
    limit?: number;
  },
) {
  console.log({ prompt, filter });

  const productIds = await db.controllers.query({ query: `` });
  console.log(productIds);

  return getProductByIds(productIds);
}
