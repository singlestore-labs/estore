import { getProductLikesById } from "@/product/likes/lib/get-by-id";
import { getProductSales } from "@/product/sales/lib/get-by-id";
import { getProductSizesById } from "@/product/size/lib/get-by-id";
import { Product } from "@/product/types";

export async function getProductMetaById(
  id: Product["id"],
): Promise<Pick<Product, "sizes" | "likes" | "sales">> {
  const [sizes, likes, sales] = await Promise.all([
    getProductSizesById(id),
    getProductLikesById(id),
    getProductSales({ id }),
  ]);

  return { sizes, likes, sales } as const;
}
