import { getProducts } from "@/product/lib/get-many";
import { User } from "@/user/types";

export async function getRecommendedProducts(
  prompt: string,
  userId: User["id"],
  { limit = 1 }: { limit: number },
) {
  return getProducts({ limit });
}
