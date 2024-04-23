import { getProducts } from "@/product/lib/get-many";
import { User } from "@/user/types";

export async function getRecommendedProducts(
  prompt: string,
  { userId, limit = 1 }: { userId: User["id"]; limit: number },
) {
  return getProducts({ limit });
}
