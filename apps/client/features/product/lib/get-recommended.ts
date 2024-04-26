import { getProducts } from "@/product/lib/get";
import { User } from "@/user/types";

export async function getRecommendedProducts(userId: User["id"], filter: Parameters<typeof getProducts>[0]) {
  return getProducts(filter);
}
